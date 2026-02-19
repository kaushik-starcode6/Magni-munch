
let totalProtein = 0;
    let userName = "";
    let dailyClicks = [0,0,0,0,0,0,0];
    const days = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];

    const vegFoods = ["Paneer", "Dal", "Sprouts", "Milk", "Chickpeas", "Soya"];
    const nonVegFoods = ["Chicken", "Eggs", "Fish", "Mutton", "Paneer", "Dal"];

    function nextStep(){
        userName = document.getElementById("username").value.trim();
        if(!userName) { alert("Please enter your name"); return; }
        document.getElementById("step1").classList.add("hidden");
        document.getElementById("step2").classList.remove("hidden");
    }

    function startGame(type){
        document.getElementById("step2").classList.add("hidden");
        document.getElementById("tracker").classList.remove("hidden");
        
        let foods = (type === 'veg') ? vegFoods : nonVegFoods;
        let table = `<table><tr><th>Day</th>`;
        foods.forEach(f => table += `<th>${f}</th>`);
        table += `</tr>`;

        for(let i=0; i<7; i++){
            table += `<tr><td><strong>${days[i]}</strong></td>`;
            for(let j=0; j<foods.length; j++){
                table += `<td><div class="protein-btn" onclick="toggleCell(this, ${i})"></div></td>`;
            }
            table += `</tr>`;
        }
        table += `</table>`;
        document.getElementById("tableArea").innerHTML = table;
    }

    function toggleCell(el, row){
        if(!el.classList.contains("selected")){
            if(dailyClicks[row] >= 3){
                alert("Maximum 3 protein selections per day allowed.");
                return;
            }
            el.classList.add("selected");
            dailyClicks[row]++;
            totalProtein++;
        } else {
            el.classList.remove("selected");
            dailyClicks[row]--;
            totalProtein--;
        }
    }

    function generateResult(){
        document.getElementById("tracker").classList.add("hidden");
        document.getElementById("certificate").classList.remove("hidden");
        
        document.getElementById("certName").innerText = userName;
        document.getElementById("certScore").innerText = `For completing ${totalProtein} Protein Choices this week!`;
        
        let mood = "";
        if(totalProtein >= 12) mood = "You are a total Protein Legend! ";
        else if(totalProtein >= 7) mood = "Great job! Kitty is very proud of you. ";
        else mood = "Good start! Let's aim for more protein next week! ";
        document.getElementById("certMood").innerText = mood;

        drawChart();

    }
   
    function drawChart(){
        const canvas = document.getElementById("scoreChart");
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0,0,450,180);
        dailyClicks.forEach((val, i) => {
            const h = val * 35;
            ctx.fillStyle = "#ff66b3";
            ctx.fillRect(i * 60 + 40, 140 - h, 35, h);
            ctx.fillStyle = "#333";
            ctx.fillText(days[i].substring(0,3), i * 60 + 45, 160);
        });
    }

    function downloadPDF(){
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF('l', 'mm', 'a4');
        
        // Background & Border
        doc.setDrawColor(255, 51, 153);
        doc.setLineWidth(2);
        doc.rect(5, 5, 287, 200);
        doc.setLineWidth(1);
        doc.rect(8, 8, 281, 194);

        // Content
        doc.setFont("times", "bold");
        doc.setFontSize(30);
        doc.setTextColor(255, 51, 153);
        doc.text("MAGNI MUNCH ACHIEVEMENT", 148, 40, { align: "center" });

        doc.setFont("helvetica", "normal");
        doc.setFontSize(16);
        doc.setTextColor(100);
        doc.text("This official certificate is presented to", 148, 60, { align: "center" });

        doc.setFont("times", "italic");
        doc.setFontSize(45);
        doc.setTextColor(0);
        doc.text(userName, 148, 90, { align: "center" });

        doc.setFont("helvetica", "bold");
        doc.setFontSize(22);
        doc.text(`Completed ${totalProtein} Protein Choices!`, 148, 120, { align: "center" });

        doc.setFont("helvetica", "italic");
        doc.setFontSize(14);
        doc.text(document.getElementById("certMood").innerText, 148, 140, { align: "center" });

        doc.text("Keep attracting healthy food like a magnet!", 148, 170, { align: "center" });

        doc.save(`${userName}_Achievement.pdf`);
    }
   
   function spawnProtein() {
    console.log("Spawning a protein icon..."); // This will show in the F12 console
    const emojis = ['🍗', '🥚', '🥛', '🐟', '🥩', '🌱'];
    const el = document.createElement('div');
    el.className = 'floating-protein';
    el.innerText = emojis[Math.floor(Math.random() * emojis.length)];
    el.style.left = Math.random() * 100 + 'vw';
    el.style.animationDuration = (Math.random() * 5 + 7) + 's';
    
    // Add a bright color temporarily to see them better
    el.style.color = "red"; 
    
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 12000);
}

// Start the effect immediately
setInterval(spawnProtein, 1500);
