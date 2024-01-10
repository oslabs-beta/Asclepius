<h1>Asclepius</h1>

<h3>Kubernetes Cluster health monitoring tool</h3>

<a href="link to splash page" >
  <img alt="html5" src="client\src\assets\AsclepiusLogoOld.png" style="width: 150px" />
</a>
<a href="https://medium.com/@osasclepius/fbe705188af0" >
  <img alt="html5" src="https://miro.medium.com/v2/resize:fit:8978/1*s986xIGqhfsN8U--09_AdA.png" style="width: 150px; background-color: whitesmoke" />
</a>
<hr>
<div style="width: 90%; display: flex;">
  <div>
  <h3>Tech Stack</h3>
    <div width="500px">
      <img alt="React" src="https://img.shields.io/badge/-React-61DAFB?style=for-the-badge&logo=react&logoColor=white" />
      <img alt="Redux" src="https://img.shields.io/badge/-Redux-764ABC?style=for-the-badge&logo=redux&logoColor=white" />
      <img alt="Nodejs" src="https://img.shields.io/badge/-Nodejs-43853d?style=for-the-badge&logo=Node.js&logoColor=white" />
      <img alt="Express" src="https://img.shields.io/badge/-Express-000000?style=for-the-badge&logo=express&logoColor=white" />
      <img alt="PostgreSQL" src="https://img.shields.io/badge/PostgreSQL-316192.svg?style=for-the-badge&logo=postgresql&logoColor=white" />
      <img alt="JavaScript" src="https://img.shields.io/badge/-JavaScript-F7DF1E?logo=javascript&logoColor=white&style=for-the-badge" />
      <br>
      <img alt="Kubernetes" src="https://img.shields.io/badge/kubernetes-%23326ce5.svg?style=for-the-badge&logo=kubernetes&logoColor=white" />
      <img alt="html5" src="https://img.shields.io/badge/-HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" />
      <img alt="css3" src="https://img.shields.io/badge/-CSS3-1572B6?style=for-the-badge&logo=html5&logoColor=white" />
      <img alt="Sass" src="https://img.shields.io/badge/-Sass-CC6699?style=for-the-badge&logo=sass&logoColor=white" />
      <img alt="git" src="https://img.shields.io/badge/-Git-F05032?style=for-the-badge&logo=git&logoColor=white" />
      <img alt="Webpack" src="https://img.shields.io/badge/-Webpack-8DD6F9?style=for-the-badge&logo=webpack&logoColor=white" />
      <img alt="D3" src="https://img.shields.io/badge/-D3-F9A03C?style=for-the-badge&logo=d3.js&logoColor=white" />
    </div>
    <br>
    <div>
    <h3>How to use Asclepius:</h3>
    <h4>Downloading the Source Code:</h4>
    <p>To get started with Asclepius, first fork the Github Repository. Once you have a copy of the reposityory, clone it onto your machine. After you've cloned the repository into the folder of your choice, open the folder in your code editor and start a new terminal. Make sure that you are cd'd into the root of the project folder and then run "npm install". This might take a while, as all the dependencies needed for Asclepius to run will be downloaded and installed in a new folder called "node_modules".</p>
    <p>After installing the required dependencies, you should be able to run the command "npm start". This command will spin up the app and open a new page in your default browser accessing "localhost:8080", where you should now see the Asclepius home page!</p>
    <p>Once Asclepius is running in your browser, you have access to a button "Render Node Map". However this button will only populate a map if your Kubernetes cluster is linked to your local machine. You can check this by navigating to the ".kube" folder in your file explorer. Default install location varies by platform.</p>
    <div style="color: black; background-color: lightgrey; padding: 5px; margin: 0px">
    <p><strong>Linux:</strong> $HOME/.kube or ~/.kube
    
<strong>MacOS:</strong> $HOME/.kube or ~/.kube

<strong>Windows:</strong> C:\Users\<username>\.kube</p>

</div>
    <p>If this folder doesn't exist, it's likely that you haven't installed "Kubectl". This is a CLI used with Kubernetes to configure, manage, and query Kubernetes clusters.</p>
    <p>Luckily, Asclepius makes it easy to navigate through this setup process. Please follow the prompts in Asclepius to properly install required CLIs and apply necessary configurations.</p>
<div style="background-color: lightgrey; padding: 5px; margin: 0px">
  <h3 style=" margin: 0px; color: black">If you run into any issues or hangups during the configuration process, please try spinning down your instance and restarting the code editor entirely! Asclepius is still in development and some edge cases might not be fully tested yet.</h3>
</div>
<br>
<h3>Engineering Philosophy:</h3>
<p>Asclepius was created to make the user experience of visualizing node health as seamless and abstracted as possible. We accomplish this by guiding you through a series of prompts designed to successfully add a Kubernetes config file to your local machine. Asclepius currently supports Local and Cloud-hosted Kubernetes deployments. If you are using a cloud platform not supported by Asclepius, please research the necessary steps to get a config file on your system. After this is accomplished, you should still be able to visualize your cluster health using the <strong>"Render Node Map"</strong> button.</p>
<br>
<p>Asclepius interacts with your local terminal through a <strong>Node.js</strong> method called <strong>"spawnSync"</strong>. As the user works through the series of prompts and checks on the client side, we call spawnSync for a variety of functionality including: Version checks, Login authentication, Configuration and Kubectl metric retrieval commands.</p>
<p></p>
</div>
<br>
<h3>Meet the Team</h3>
<p>Asclepius was created by a development team under the OS-Labs open source tech accelerator.</p>
<h4>Kola Bamgbose</h4>
<h4>Cameron Blair</h4>
<h4>John Norlin</h4>
<h4>Hugh Stapleton</h4>
<h4>Nick Vanderlinden</h4>
<br>
<h2>Current Version</h2>
<h3>Alpha: v0.1.0</h3>
  </div>
</div>
