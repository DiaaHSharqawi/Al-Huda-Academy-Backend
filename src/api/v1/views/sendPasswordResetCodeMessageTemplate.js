const resetPasswordMessageTemplate = `
<html>
  <head>
    <style>
      body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 20px;
        background-color: #f9f9f9;
      }
      .container {
        background-color: white;
        padding: 20px;
        border: 1px solid #568443;
        border-radius: 5px;
        text-align: center;
        max-width: 600px;
        margin: 0 auto;
      }
      h1 {
        color: #568443;
        font-size: 24px;
      }
      .greeting {
        font-size: 18px;
        color: #333;
        margin-bottom: 20px;
      }
      .code {
        font-size: 24px;
        font-weight: bold;
        color: #568443;
        margin: 20px 0;
      }
      p {
        font-size: 16px;
        color: #555;
        margin: 10px 0;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <span> Al Huda Academy for the Holy Quran</span> 
      <h1>Reset Password</h1>
      <p class="greeting">As-salamu alaykum</p>
      <p>We received a request to reset your password. Please use the code below to reset your password:</p>
      <p class="code">{{verificationCode}}</p>
      <p>Please enter this code along with your new password.</p>
    </div>
  </body>
</html>
`;

module.exports = resetPasswordMessageTemplate;
