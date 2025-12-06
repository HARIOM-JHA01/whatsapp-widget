# WhatsApp Widget Generator

A modern web app to create and preview custom WhatsApp chat widgets for your website. Instantly generate a ready-to-use script tag with your own branding, colors, and chat settings.

## Features

- Beautiful, animated UI for widget configuration
- Live preview of WhatsApp button and chat widget
- Customizable button and chat appearance
- Generates script tag for easy website integration
- Supports Vercel deployment and self-hosted embed script
- Copy and download generated HTML snippet

## How It Works

1. **Configure your widget:** Enter your WhatsApp number, button text, colors, and chat widget details.
2. **Preview live:** See exactly how the widget will look and behave on your site.
3. **Generate script:** Click "Generate Script" to get a copy-paste HTML snippet.
4. **Integrate:** Paste the snippet before your site's closing `</body>` tag.

## Example Output

```html
<script
  async
  src="https://your-vercel-domain.vercel.app/embeds/embed.min.js"
></script>
<script>
  var wa_btnSetting = {
    /* ...your settings... */
  };
  var wa_widgetSetting = {
    /* ...your chat widget settings... */
  };
  window.onload = () => {
    _waEmbed(wa_btnSetting, wa_widgetSetting);
  };
</script>
```

## Local Development

1. **Install dependencies:**
   ```sh
   bun install
   ```
2. **Start the dev server:**
   ```sh
   bun run dev
   ```
3. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Deployment

- Deploy to [Vercel](https://vercel.com/) for instant HTTPS hosting.
- The embed script will be available at `/embeds/embed.min.js` on your domain.

## Customization

- All widget and chat settings are customizable via the homepage form.
- Supports custom colors, images, greeting text, and more.

## Security & Best Practices

- Always use HTTPS for the embed script.
- Validate WhatsApp numbers (E.164 format recommended).
- Avoid sharing sensitive info in widget settings.

## License

MIT

---

Made with ❤️ by Hariom Jha
