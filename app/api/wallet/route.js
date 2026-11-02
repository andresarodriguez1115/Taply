import { NextResponse } from "next/server";
import { PKPass } from "passkit-generator";
import { readFileSync } from "fs";
import { join } from "path";
import sharp from "sharp";

const withHttps = (u) => (u.startsWith("http") ? u : `https://${u}`);

export async function POST(request) {
  try {
    const {
      name, title, phone, email, website, linkedin,
      username, photoUrl, bgColor, logoUrl, textColor,
    } = await request.json();

    const signerCert = readFileSync(join(process.cwd(), "taply-cert.pem"), "utf8");
    const signerKey = readFileSync(join(process.cwd(), "taply-key.pem"), "utf8");
    const wwdr = readFileSync(join(process.cwd(), "wwdr.pem"), "utf8");

    const fg = textColor || "rgb(255,255,255)";
    // Label color follows the card color: black on light cards, white on dark cards
    const bg = bgColor && !bgColor.startsWith("radial") ? bgColor : "rgb(0,0,0)";
    const [r, g, b] = (bg.match(/\d+/g) || [0, 0, 0]).map(Number);
    const isLightBg = 0.299 * r + 0.587 * g + 0.114 * b > 150;
    const labelColor = isLightBg ? "rgb(0,0,0)" : "rgb(255,255,255)";
    const profileUrl = `https://taply.now/${username}`;

    const pass = await PKPass.from({
      model: join(process.cwd(), "pass-model.pass"),
      certificates: { wwdr, signerCert, signerKey },
    }, {
      serialNumber: username,
      backgroundColor: bgColor && !bgColor.startsWith("radial") ? bgColor : "rgb(0,0,0)",
      foregroundColor: fg,
      labelColor,
    });

    // ── FRONT ──
    if (username?.trim()) {
      pass.headerFields.push({
        key: "link",
        value: `taply.now/${username.trim()}`,
      });
    }

    pass.primaryFields.push({
      key: "name",
      value: name,
      ...(title?.trim() ? { label: title.trim() } : {}),
    });
    if (phone?.trim()) pass.secondaryFields.push({ key: "phone", label: "PHONE", value: phone.trim() });
    if (email?.trim()) pass.secondaryFields.push({ key: "email", label: "EMAIL", value: email.trim() });

    // ── BACK (tappable) ──
    pass.backFields.push({
      key: "profile",
      label: "Taply profile",
      value: profileUrl,
      attributedValue: `<a href="${profileUrl}">View my profile</a>`,
    });
    if (phone?.trim()) {
      pass.backFields.push({
        key: "callBack",
        label: "Call",
        value: phone.trim(),
        dataDetectorTypes: ["PKDataDetectorTypePhoneNumber"],
      });
    }
    if (email?.trim()) {
      pass.backFields.push({
        key: "emailBack",
        label: "Email",
        value: email.trim(),
        attributedValue: `<a href="mailto:${email.trim()}">${email.trim()}</a>`,
      });
    }
    if (website?.trim()) {
      const url = withHttps(website.trim());
      pass.backFields.push({
        key: "websiteBack",
        label: "Website",
        value: url,
        attributedValue: `<a href="${url}">${website.trim()}</a>`,
      });
    }
    if (linkedin?.trim()) {
      const li = linkedin.trim();
      const url = li.startsWith("http") ? li : `https://linkedin.com/in/${li}`;
      pass.backFields.push({
        key: "linkedinBack",
        label: "LinkedIn",
        value: url,
        attributedValue: `<a href="${url}">View LinkedIn</a>`,
      });
    }
    pass.backFields.push({
      key: "poweredBy",
      label: "Powered by",
      value: "https://taply.now",
      attributedValue: `<a href="https://taply.now">Made with Taply</a>`,
    });

    // ── LOGO (sharp at every size) ──
    if (logoUrl) {
      const logoRes = await fetch(logoUrl);
      if (logoRes.ok) {
        const logoBuffer = Buffer.from(await logoRes.arrayBuffer());
        const sizes = [[160, 50, "logo.png"], [320, 100, "logo@2x.png"], [480, 150, "logo@3x.png"]];
        for (const [w, h, file] of sizes) {
          const buf = await sharp(logoBuffer).resize(w, h, { fit: "inside" }).png().toBuffer();
          pass.addBuffer(file, buf);
        }
      } else {
        console.error("Logo fetch failed:", logoRes.status, logoRes.statusText);
      }
    }

    // ── PROFILE PHOTO (round, sharp at every size) ──
    if (photoUrl) {
      const imageRes = await fetch(photoUrl);
      if (imageRes.ok) {
        const imageBuffer = Buffer.from(await imageRes.arrayBuffer());
        const makeCircle = async (size) => {
          const mask = Buffer.from(
            `<svg width="${size}" height="${size}"><circle cx="${size / 2}" cy="${size / 2}" r="${size / 2}" fill="white"/></svg>`
          );
          return sharp(imageBuffer)
            .resize(size, size, { fit: "cover", position: "top" })
            .composite([{ input: mask, blend: "dest-in" }])
            .png()
            .toBuffer();
        };
        pass.addBuffer("thumbnail.png", await makeCircle(90));
        pass.addBuffer("thumbnail@2x.png", await makeCircle(180));
        pass.addBuffer("thumbnail@3x.png", await makeCircle(270));
      }
    }

    // ── QR ──
    pass.setBarcodes({
      message: profileUrl,
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