const xhr = new XMLHttpRequest(); // New Message

xhr.addEventListener('load', () => {
  console.log(xhr.response);
});

xhr.open('GET', 'https://supersimplebackend.dev/images/apple.jpg');  // Configure Message
xhr.send();