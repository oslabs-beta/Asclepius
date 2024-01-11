<h1>Asclepius</h1>

<h3>Kubernetes Cluster health monitoring tool</h3>

<a href="link to splash page" >
  <img alt="html5" src="client\src\assets\FullhorizontalAsclepius.png" style="padding-left: 5px; height: 32px; background-color: whitesmoke; padding-right: 5px; padding-bottom: 5px;" />
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
    <h3>Introduction:</h3>
    <p style="margin-bottom: 0">Asclepius is an open-source K8s node health monitoring service for local or cloud-deployed K8s clusters. Asclepius delivers a simplified dashboard of each K8s node’s health at a glance, with the option to select nodes and display the contained pod list with kubelet supplied data metrics. The Asclepius dashboard updates in near real time to ensure that as soon as any nodes show signs of going down, you and your team can respond accordingly.</p>
    <h3>How to use Asclepius:</h3>
    <h4>Downloading the Source Code:</h4>
    <p style="margin-bottom: 0">To get started with Asclepius, clone it onto your machine. After you've cloned the repository into the folder of your choice run:</p>
    <code>npm install</code>
    <p style="margin-bottom: 0">After installing the required dependencies, you should be able to run the command:</p>
    <code>npm start</code>
    <p>This command will spin up the app and open a new page in your default browser; accessing "localhost:8080", where you should now see the Asclepius home page!</p>
    <p>Once Asclepius is running in your browser, you have access to a button: "Render Node Map". From here, Asclepius makes it easy to connect either your local or cloud hosted cluster. Please follow the prompts and Asclepius will properly install required CLIs and apply any necessary configurations for you.
    </p>
<br>
<h3>Engineering Philosophy:</h3>
<p>Asclepius was created to make the user experience of visualizing node health as seamless and abstracted as possible. We accomplish this by guiding you through a series of prompts designed to successfully add a Kubernetes config file to your local machine. Asclepius currently supports local and cloud-hosted Kubernetes deployments. If you are using a cloud platform not supported by Asclepius, please research the necessary steps to get a config file on your system. After this is accomplished, you should also be able to visualize your cluster health using the <strong>"Render Node Map"</strong> button.</p>
<br>
<p>Asclepius interacts with your local terminal through a <strong>Node.js</strong> method called <strong>"spawnSync"</strong>. As the user works through the series of prompts and checks on the client side, we call spawnSync for a variety of functionality including: version checks, login authentication, configuration and kubectl metric retrieval queries.</p>
<p></p>
</div>
<br>
<h3>How to Contribute</h3>
<p>
<h4>Branch management</h4>
Please submit any pull requests to the dev branch. All changes will be reviewed by the team before merging.

<h4>Bugs and suggestions</h4>
For help with existing issues, please read our GitHub issues page. If you cannot find a relevant topic in the issues page, please file a new issue.
We welcome all suggestions and feedback!
</p>
<h3>Meet the Team</h3>
<p>Asclepius was created by a development team under the OS-Labs open source tech accelerator.</p>
<div>
<h4 style="display: inline-block; margin-right: 20px;">Kola Bamgbose
</h4>
<img src="client\src\assets\headshots\kola.png" style="width: 75px;">
<div style="display: inline-block; margin-right: 40px;">
<a href="https://www.linkedin.com/in/kola-b-023383171/" target="_blank">
<img src="client\src\assets\LinkedIn_icon.svg.png" style="width: 40px"/>
<a>
<a href="https://github.com/kbamgbosee" target="_blank">
<img src="client\src\assets\Github_icon.png" style="background-color: white; width: 36px; padding: 2px"/>
<a>
</div>
<h4 style="display: inline-block; margin-right: 20px;">Cameron Blair
</h4>
<img src="client\src\assets\headshots\cam.png" style="width: 75px;">
<div style="display: inline-block; margin-right: 20px;">
<a href="https://www.linkedin.com/in/cameron-blair-a2aa60259/" target="_blank">
<img src="client\src\assets\LinkedIn_icon.svg.png" style="width: 40px"/>
<a>
<a href="https://github.com/CamB975" target="_blank">
<img src="client\src\assets\Github_icon.png" style="background-color: white; width: 36px; padding: 2px"/>
<a>
</div>
<h4 style="display: inline-block; margin-right: 20px;">John Norlin</h4>
<img src="client\src\assets\headshots\john.png" style="width: 75px;">
<div style="display: inline-block; margin-right: 20px;">
<a href="https://www.linkedin.com/in/johnwsnorlin/" target="_blank">
<img src="client\src\assets\LinkedIn_icon.svg.png" style="width: 40px"/>
<a>
<a href="https://github.com/johnnorlin" target="_blank">
<img src="client\src\assets\Github_icon.png" style="background-color: white; width: 36px; padding: 2px"/>
<a>
</div>
</div>
<div>
<h4 style="display: inline-block; margin-right: 20px;">Hugh Stapleton</h4>
<img src="client\src\assets\headshots\hugh.png" style="width: 75px;">
<div style="display: inline-block; margin-right: 40px;">
<a href="https://www.linkedin.com/in/hugh-stapleton-92b44558/" target="_blank">
<img src="client\src\assets\LinkedIn_icon.svg.png" style="width: 40px"/>
<a>
<a href="https://github.com/tackleshaft" target="_blank">
<img src="client\src\assets\Github_icon.png" style="background-color: white; width: 36px; padding: 2px"/>
<a>
</div>
<h4 style="display: inline-block; margin-right: 20px;">Nick Vanderlinden</h4>
<img src="client\src\assets\headshots\nick.png" style="width: 75px;">
<div style="display: inline-block; margin-right: 20px;">
<a href="https://www.linkedin.com/in/nick-vanderlinden-36329b14a/" target="_blank">
<img src="client\src\assets\LinkedIn_icon.svg.png" style="width: 40px"/>
<a>
<a href="https://github.com/nick-vanderlinden" target="_blank">
<img src="client\src\assets\Github_icon.png" style="background-color: white; width: 36px; padding: 2px"/>
<a>
</div>
</div>
<br>
<h2>Current Version</h2>
<h3>Alpha: v0.1.0</h3>
  </div>
</div>
