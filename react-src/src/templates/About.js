import React, { useState } from "react";

const About = () => {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      access_token: "df9j3jf8urqgokxr5pan82v6", // sent after you sign up
      subject: subject,
      text: message + "\n\n" + email
    };

    const params = new URLSearchParams(data);

    fetch("https://postmail.invotes.com/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: params
    })
      .then((response) => {
        if (response.ok) {
          js_onSuccess();
        } else {
          js_onError("Email could not be sent.");
        }
      })
      .catch((error) => {
        js_onError(error.message);
      });
  };

  const js_onSuccess = () => {
    // Handle success, e.g., show a success message
    window.location = `${window.location.pathname}?message=Email+Successfully+Sent%21&isError=0`;
  };

  const js_onError = (error) => {
    // Handle error, e.g., show an error message
    window.location = `${window.location.pathname}?message=${encodeURIComponent(error)}&isError=1`;
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
      <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          name="subject"
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
        <textarea
          name="text"
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>
        <input type="submit" value="Send" />
      </form>
    </div>
  );
};

export default About;
