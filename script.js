function randint(min, max) {
   min = Math.ceil(min);
   max = Math.floor(max);
   return Math.floor(Math.random() * (max - min + 1)) + min;
}

function onAgentUpdate(agent) {
   if (agent.d === 0) {
      agent.fire(false);
   } else {
      agent.fire(true)
   }

   let rotation = document.getElementById('direction');
   let dx = randint(-1, 1);
   let dy = randint(-1, 2);
   agent.move(dx, dy);
   // console.log(agent.d);
   agent.lookTo(randint(0, 3));

   // var elt = document.querySelector('checkbox');
   // elt.checked = true;

   let el = document.querySelector("img");
   // console.log(el)

   // control for the rotation of the robot
   if (agent.dir === 1) {
      rotation.style.transform = "rotate(90deg)";
   } else if (agent.dir === 2) { 
      rotation.style.transform = "rotate(180deg)";
   } else if (agent.dir === 3) {
      rotation.style.transform = "rotate(-90deg)";
   } else {
      rotation.style.transform = "rotate(0deg)";
   }

   agent.lookTo(0, 3);
   agent.move(dx, dy);
}


//Allows you to retrieve the url
function onLoaded() {
   let href = window.location.href;
   let url = new URL(href);

   let agentId = url.searchParams.get('agentid');
   let readonly = url.searchParams.get('readonly');

   // console.log(url.searchParams.get('agentid'));

   if (agentId === null) {
      // console.log("agentid manquant");
      return;
   }
   if (readonly === null) { //readonly : allows to prohibit execution of the script of the movements of the robot
      // console.log("readonly manquant");
      return;
   }

   if (readonly === "1")
      readonly = true;
   else
      readonly = false;



   // console.log("Création de l'agent"); //lets urg my agent
   let monAgent = new Agent(agentId, "demo", "demo", "iframebattlefx", 8080, "mqtt.jusdeliens.com", 4, readonly);    //Let : Variable locale
   monAgent.connect(); //Connects the agent to the arena
   monAgent.executeOnUpdate(onAgentUpdate);

}

document.addEventListener("DOMContentLoaded", onLoaded); // Paradigme event
