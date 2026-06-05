import { NextResponse } from "next/server";
import { PKPass } from "passkit-generator";
import { readFileSync } from "fs";
import { join } from "path";
import sharp from "sharp";

export async function POST(request) {
  try {
    const { name, title, phone, email, username, photoUrl, bgColor, logoUrl, textColor } = await request.json();
console.log("bgColor received:", bgColor);
console.log("textColor received:", textColor);
console.log("logoUrl received:", logoUrl);

    const signerCert = readFileSync(join(process.cwd(), "taply-cert.pem"), "utf8");
    const signerKey = readFileSync(join(process.cwd(), "taply-key.pem"), "utf8");
    const wwdr = readFileSync(join(process.cwd(), "wwdr.pem"), "utf8");

    const pass = await PKPass.from({
      model: join(process.cwd(), "pass-model.pass"),
      certificates: { wwdr, signerCert, signerKey },
    }, {
      serialNumber: username,
      backgroundColor: bgColor && !bgColor.startsWith("radial") ? bgColor : "rgb(0,0,0)",
      foregroundColor: textColor || "rgb(255,255,255)",
    });

    pass.primaryFields.push({ key: "name", label: "NAME", value: name });
    pass.secondaryFields.push({ key: "title", label: "TITLE", value: title });
    pass.auxiliaryFields.push({ key: "phone", label: "PHONE", value: phone || "" });
    pass.auxiliaryFields.push({ key: "email", label: "EMAIL", value: email || "" });
    pass.backFields.push({ key: "profile", label: "View Profile", value: `https://taply.now/${username}` });
if (logoUrl) {
  console.log("Fetching logo from:", logoUrl);

  const logoRes = await fetch(logoUrl);

  if (!logoRes.ok) {
    console.error("Logo fetch failed:", logoRes.status, logoRes.statusText);
  }

  const logoBuffer = Buffer.from(await logoRes.arrayBuffer());

  const logo = await sharp(logoBuffer).png().toBuffer();
  const logo2x = await sharp(logoBuffer).png().toBuffer();

  pass.addBuffer("logo.png", logo);
  pass.addBuffer("logo@2x.png", logo2x);
}

    if (photoUrl) {
      const imageRes = await fetch(photoUrl);
      const imageBuffer = Buffer.from(await imageRes.arrayBuffer());

      const circleSvg = Buffer.from(`<svg><circle cx="60" cy="60" r="60" fill="white"/></svg>`);
      const thumbnail = await sharp(imageBuffer)
        .resize(120, 120, { fit: "cover", position: "top" })
        .composite([{ input: circleSvg, blend: "dest-in" }])
        .png()
        .toBuffer();

      const circleSvg2x = Buffer.from(`<svg><circle cx="120" cy="120" r="120" fill="white"/></svg>`);
      const thumbnail2x = await sharp(imageBuffer)
        .resize(240, 240, { fit: "cover", position: "top" })
        .composite([{ input: circleSvg2x, blend: "dest-in" }])
        .png()
        .toBuffer();

      pass.addBuffer("thumbnail.png", thumbnail);
      pass.addBuffer("thumbnail@2x.png", thumbnail2x);
    }

    pass.setBarcodes({
      message: `https://taply.now/${username}`,
      format: "PKBarcodeFormatQR",
      messageEncoding: "iso-8859-1",
    });

    const buffer = pass.getAsBuffer();

    return new NextResponse(buffer, {
      headers: {
        "Content-Type": "application/vnd.apple.pkpass",
        "Content-Disposition": `attachment; filename="taply-${username}.pkpass"`,
      },
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}