

(function() {

	// Array for saving blocks
	var blocks = [];

	// the player object
	var Player = {
		positionX: 0,
		positionY: 0,
		isPlayer: true,
		type: Entities.Character
	}
	document.onreadystatechange = function () {
		if (document.readyState === 'complete') {
			drawMap(tileMap01);
			// Create event listener
			document.onkeyup = readKey; 
		}
	}
	// Drawing the game map
	function drawMap(map) {

		
		var main = document.createElement("div");
		main.style.width = map.width * 25 + "px";
		

		for (var row = 0; row < map.height; row++) {
			var rowDiv = document.createElement("div"); 

			for (var col = 0; col < map.width; col++) {
				// create columns
				var colDiv  = document.createElement("div"); 
				colDiv .id = row + "-" + col; 

				//Assigning different classes to different columns values
				if (map.mapGrid[row][col][0] === "W") {
					colDiv .className = Tiles.Wall;
				} else if (map.mapGrid[row][col][0] === "G") { 
					colDiv .className = Tiles.Goal;
				} else {										
					colDiv .className = Tiles.Floor;
				}
				if (map.mapGrid[row][col][0] === "P") { 
					Player.positionX = row;				
					Player.positionY = col;			
					colDiv .classList.add(Entities.Character);	
				} else if (map.mapGrid[row][col][0] === "B") { 
					// add block class
					colDiv .classList.add(Entities.Block);
					// Creating and pushing the new block object and push it into blocks.
					blocks.push({ positionX: row, positionY: col, isPlayer: false, type: Entities.Block });
				}
				
				
				rowDiv.appendChild(colDiv ); 
				colDiv .style.float = "left"
				
			}
			// Appending new rowv
			main.appendChild(rowDiv); 
		}
		// Appending the main element to the body of the document  
		document.body.appendChild(main); 
    }
	
	//Movement function
	function move(entity, direction) {

		//Temporary X and Y  Position
		var x = entity.positionX; 
		var y = entity.positionY; 

		
		switch (direction) {
			case "ArrowLeft":
				y--;
				break;
			case "ArrowUp":
				x--;
				break;
			case "ArrowRight":
				y++;
				break;
			case "ArrowDown":
				x++;
				break;
			default:
				return false;
		}

		// get new and old positions
		var newPosition = document.getElementById(x + "-" + y);
		var oldPosition = document.getElementById(entity.positionX + "-" + entity.positionY);
		

		if (newPosition.classList.contains(Tiles.Wall)) {
			return false;
		} else {
			// what if the new position is a block
			if (newPosition.classList.contains(Entities.Block)) {
				var blockIndex = blocks.findIndex((e, i) => e.positionY == y && e.positionX == x);
				var block = blockIndex > -1 ? blocks[blockIndex] : null; 
				if (block !== null) {
					if (!entity.isPlayer) {
						return false;
					}
					if (!move(block, direction)) {
						return false;
					}
					
					//Moving a moveable block
					newPosition.classList.add(entity.type);
					oldPosition.classList.remove(entity.type);
				}
			}
		}
		// Moving Player
		newPosition.classList.add(entity.type);
		oldPosition.classList.remove(entity.type);
		
		//Players new positin 
		entity.positionX = x;
		entity.positionY = y;
		return true;
	}

	// ArrowKeys on the keyboard
	function readKey() {
		switch (event.keyCode) {
			case 37:
				move(Player, "ArrowLeft");
				break;
			case 38:
				move(Player, "ArrowUp");
				break;
			case 39:
				move(Player, "ArrowRight");
				break;
			case 40:
				move(Player, "ArrowDown");
				break;
			default:
				break;
		}
	}

	
})();