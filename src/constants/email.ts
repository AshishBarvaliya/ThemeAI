const web_url = process.env.NEXTAUTH_URL;

export const getEmailHtml = (
  type: "reset-password" | "activation",
  { token, name }: { token: string; name: string }
) => {
  let data: {
    head: string;
    title: string;
    description: string;
    url: string;
    button: string;
    note: string;
  } = {
    head: "Welcome",
    title: "Welcome to ThemeAI, " + name,
    description:
      "Thank you for joining ThemeAI. We're thrilled to have you on board.",
    url: `${web_url}/themes?newuser=1&token=${token}`,
    button: "Activate",
    note: "(If you did not create an account, you may ignore this email.)",
  };
  if (type === "reset-password") {
    data = {
      head: "Reset Password",
      title: "Reset your ThemeAI Password",
      description:
        "We believe you requested a ThemeAI password reset. If so, simply hit the button below and it will open a secure web page where you can enter a new password.",
      url: `${web_url}/themes?newpassword=1&token=${token}`,
      button: "Reset Password",
      note: "(If you did not request a password reset, you may ignore this email.)",
    };
  }
  return `
    <!DOCTYPE html>
    <html lang="en">

    <head>
        <meta charset="UTF-8">
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap" rel="stylesheet">
        <title>${data.head}</title>
        <style type="text/css">
            body {
                font-family: "Poppins";
            }
            .main {
                padding: 40px;
                background-color: #FEF5EF;
            }

            header,
            footer {
                text-align: center;
                margin-bottom: 20px;
            }

            .button {
                background-color: #73FCB1;
                border: 0.5px solid #333333;
                color: black !important;
                text-decoration: none;
                font-size: 16px;
                line-height: 16px;
                cursor: pointer;
                border-radius: 45px;
                padding-top: 12px;
                padding-bottom: 12px;
                padding-left: 32px;
                padding-right: 32px;
                margin-top: 60px;
                margin-bottom: 40px;
                display: inline-block;
            }

            .container {
                margin: 0 auto;
                text-align: center;
                width: 650px;
                border: 0.5px solid #333333;
                padding: 30px;
                padding-top: 60px;
                padding-bottom: 20px;
                background-color: white;
                margin-bottom: 100px;
            }

            h1 {
                font-weight: 700;
            }

            .content {
                font-size: 14px;
                margin-top: 0px;
                color: #333333;
            }

            .note {
                font-size: 12px;
                color: #333333c5;
            }

            .footer-links {
                gap: 10px;
                color: #333333c5;
            }

            .link {
                font-size: 12px;
                text-decoration: none;
                color: rgb(76, 141, 210);
            }
        </style>
    </head>

    <body>
        <div class="main">
            <header>
                <img src="logo.svg" alt="ThemeAI logo" />
            </header>
            <div class="container">
                <h1>${data.title}</h1>
                <p class="content">${data.description}</p>
                <a href=${data.url} class="button">${data.button}</a>
                <p class="note">${data.note}</p>
            </div>
            <footer>
                <p class="note">© 2024 ThemeAI. All rights reserved.</p>
                <p class="note">This service message contains information about your <a class="link"
                        href=${web_url} target="_blank" rel="noopener noreferrer">ThemeAI.io</a> account.
                </p>
                <div class="footer-links">
                    <a class="link" href="${web_url}/privacy" target="_blank" rel="noopener noreferrer">Privacy
                        Policy</a>
                    |
                    <a class="link" href="${web_url}/terms" target="_blank" rel="noopener noreferrer">Terms of
                        service</a>
                </div>
            </footer>
        </div>
    </body>

    </html>
    `;
};
