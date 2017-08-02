<!DOCTYPE html> <html>
<head>
<title>Pyro's Adventure</title>

<style>
pre {
    background-color: #F5F5F5;
	border: 5px solid #8e9baf;
    display: inline-block;
	height: 500px;
    width: 100%;
    overflow: auto;
    background-color: #eeeeee;
	text-align: left;
	padding-left: 3px;
	font-size: 125%;
}
</style>
<script src="http://code.jquery.com/jquery-1.9.1.js"></script>
<script language="JavaScript">
	var pause = false;
	var shootable = !pause;
	var enemyShootable = !pause;
	var up = 1;
	var down = 2;
	var left = 3;
	var right = 4;
	
	var playerID = 0;
	var enemyID = 1;
	
	var mainImg = new Image();

	var attackImg ="http://www.clker.com/cliparts/y/m/X/o/s/R/down-arrow-circle-hi.png";
	var neutralImg = "http://www.iconsdb.com/icons/preview/royal-blue/circle-xxl.png";
	var neutral = 0;
	var attack = 1;
	var mainState = neutral; 
	mainImg.src=neutralImg;

	var mainImgRad = 25;
	mainImg.width = mainImgRad * 2;
	mainImg.height = mainImgRad * 2;
	var mainChar = {x: 250, y: 8*50};
	var dx = 50;
	var dy = 50;
	
	var lives = 1;

	var enemyArr = [];
	var enemySRC = "http://www.iconsdb.com/icons/preview/purple/circle-xxl.png";
	var enemyShootChance = 70;
	var enemyDead = 0;
	var enemySpawned = 0;
	
	var crosshair = new Image();
	crosshair.src="http://www.clipartbest.com/cliparts/dT8/xBB/dT8xBBGTe.png";
	crosshair.width = 20;
	crosshair.height = 20;
	
	var shootTimer = 0;
	
	
	var boundary  = new Image();
	boundary.src = "http://www.debscrossstitch.co.uk/ekmps/shops/debscrossstitch/images/bright-green-square-aperture-card-envelope-6-x-8-a5--3440-p.jpg";
	
	var terrainImg = [
		//facility
		"http://www.drodd.com/images14/black16.jpg",
		//hospital
		"http://www.drodd.com/images14/black16.jpg",
		//training ground
		"https://media.indiumgames.com/medialibrary/2014/07/MakingMap1.png",
		//field
		"http://www.drodd.com/images14/black16.jpg"
	];
	var terrainBound = [
		//facility
		[
			[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
			[1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
			[1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1],
			[1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
			[1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1],
			[1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1],
			[1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1],
			[1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
			[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
			[1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
			[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
		],
		//hospital
		[
			[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
			[1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1],
			[1, 0, 0, 0, 1, 1, 0, 1, 1, 0, 1],
			[1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1],
			[1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1],
			[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
			[1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1],
			[1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1],
			[1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1],
			[1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1],
			[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
		],
		//training ground
		[
			[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
			[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
			[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
			[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
			[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
			[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
			[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
			[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
			[1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1],
			[1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
			[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
		],
		//field
		[
			[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
			[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
			[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
			[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
			[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
			[1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1],
			[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
			[1, 1, 1, 0, 0, 1, 0, 0, 1, 1, 1],
			[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
			[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
			[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
		]
	];
	var room = 0;
	
	var timer = 0;
	
	var mouse  = {
		x:0,
		y:0
	};
	
	var bulletImg = new Image();
	//bulletImg.src = "http://4.bp.blogspot.com/_UQmvUodh4h4/Saf1kylPhnI/AAAAAAAAC0w/rlTxf-P3eDQ/s400/Green+Square+copy.jpg"
	bulletImg.src = "http://www.clker.com/cliparts/X/9/P/m/2/g/transparent-red-circle-md.png";
	var bulletArr = [];
	
	class Bullet {
		constructor(x, y, endX, endY, shotFrom) {
			this.width = 10;
			this.height = 10;
			this.x = x-this.width;
			this.y = y-this.height;
			this.endX = endX;
			this.endY = endY;
			this.velocityX = 0;
			this.velocityY = 0;
			
			this.speed = 10;
			this.shotFrom = shotFrom;
		}
	}
	var bulShot = 0;
	var bulDeleted = 0;
	var maxShoot = 25;
	//events
	var events = {};
	
	
	
	//canvas
	var alpha = 0;
	var delta = 0.1;
	
	//doors
	class Door {
		constructor(x, y, src, id, back) {
			this.x = x;
			this.y = y;
			this.img = new Image();
			this.img.src = src;
			this.id = id;
			this.callback = function() {
				back && back();
			}
		}
	}
	
	var doorMap = {};
	var drawDoorMap = {};
	
	//text info
	/*
		blue: days
		black: text
		green: game text
		purple: system text
		red: alerts
	
	*/
	
	function start() {
		onTick();
		perSec();
		window.addEventListener("keydown", keyDown);
		document.getElementById("myCanvas").addEventListener("mousemove", mouseMove);
		document.getElementById("myCanvas").addEventListener("mousedown", mouseDown);
		//setup
		pause = true;
		shootable = !pause;
		enemyShootable = !pause;
		var hops = new Door(25, 25, "http://www.iconsdb.com/icons/preview/purple/circle-xxl.png", "JohnHops", function() {
			events["saveHF"] = "Hops";
			room++;
			midChapterOne("Hops");
		});
		var fisher = new Door(425, 25, "http://www.clker.com/cliparts/X/9/P/m/2/g/transparent-red-circle-md.png", "LillianFisher", function() {
			events["saveHF"] = "Fisher";
			room++;
			midChapterOne("Fisher");
		});
	
		drawDoorMap["Hops"] = hops;
		drawDoorMap["Fisher"] = fisher;
		doorMap["Hops"] = hops;
		doorMap["Fisher"] = fisher;
		
		var teleportToPlace = prompt("What section would you like to go to? Start, Mid, or Field? ");
		if (teleportToPlace == "mid") {
			room = 1;
			var saved;
			if (Math.random() > 0.5) {
				saved = "Fisher";
			} else {
				saved = "Hops";
			}
			events["savedHF"] = saved;
			midChapterOne(saved);
		} else if (teleportToPlace == "field") {
			room = 3;
			var saved;
			if (Math.random() > 0.5) {
				saved = "Fisher";
				lives = 2;
			} else {
				saved = "Hops";
				maxShoot = 15;
			}
			events["savedHF"] = saved;
			deployFieldChapterOne(saved);
		} else {
			startChapterOne();
		}
		//midChapterOne();
		//room = 3;
		//maxShoot = 15;
		//deployFieldChapterOne("Hops");
		/*
		for (var i = 0; i < terrainBound.length; i++) {
			for (var j = 0; j < terrainBound[i].length; j++) {
				for (var k = 0; k < terrainBound[i][j].length; k++) {
					if (terrainBound[i][j][k] == 1) {
						print(-mainImgRad + mainImgRad*2*k + " ");
					} else {
						print(0 + " ");
					}
				}
				println("");
			}
		}*/
		/*
		printlnTimer("He Was...", 0, 230, function() {
			printTimer("A kind Man With Nothing But ", 0, 150, function() {
				printTimer("A Compassionate Heart", 0, 100);
			});
		});
		for (var i = 0; i < 10; i++) {
			setTimeout(println("HI"), 500);
		}*/
		//print("HI");
		//for (var i = 0; i < 100; i++) {
		//	doScaledTimeout(i, 500);
		//}
		
		//spawnEnemy();
		/*
		println("HI");
		println("HI2");
		println("HIHIHAIHEFSIFHAS");
		println("ASFASDFASDFASDF");
		println("A");*/
	}
	
	
	function startChapterOne() {		
		printlnTimer("Prologue:       ", "black", 0, 300, function() {
			printlnTimer("They made you to protect     ", "black", 0, 100, function() {
				printlnTimer("They made you to fight     ", "black", 0, 100, function() {
					printlnTimer("But they never expected you to care...   ", "black", 0, 90, function() {
						printlnTimer("They put you down to fix you till you could be perfect", "black", 0, 80, function() {
							printlnTimer("And yet, you still would care             ", "black", 0, 80, function() {
								println(" ", "black");
								println("          *  *  *         ", "black");
								println("", "black");
								printlnTimer("Chapter One", "black", 0, 300, function() {
									window.setTimeout(function() {
										print("[Man] ", "black");
										printlnTimer("Are we sure he's ready?    ", "black", 0, 50, function() {
											window.setTimeout(function() {
												print("[Woman] ", "black");
												printlnTimer("There is no time, we have to deploy him!   ", "black", 0, 40, function() {
													window.setTimeout(function() {
														print("[Man] ", "black");
														printlnTimer("Okay okay, I'm booting him up!    ", "black", 0, 20, function() {
															print("[Man] ", "black");
															printlnTimer("Everyone stand back! He's getting up!!   ", "black", 0, 60, function() {
																window.setTimeout(function() {fadeIn(50, function() {
																	fadeOut(40, function() {
																		fadeIn(30, function() {
																			fadeOut(20, function() {
																				fadeIn(10, function() {
																					printlnTimer("ALERT ALL MEMBERS REPORT TO THE MOTHERBOARD!", "red", 0, 70, function() {
																						window.setTimeout(function() {
																							print("[Man] ","black");
																							printlnTimer("We have to go now, but you must save Hops and Fisher!", "black", 0, 70, function() {
																								print("[Man] ", "black");
																								printlnTimer("That's an order! Go, I'll download their profiles into you!", "black", 0, 60, function() {
																									println("*****************SYSTEM FAILURE*****************", "purple");
																									println("******************ERROR ERROR******************", "purple");
																									println("*************ATTEMPTING TO REBOOT**************", "purple");
																									println("****************REBOOT SUCCESSFUL**************", "purple");
																									println("FILES:", "black");
																									println("", "black");
																									println("John Hops:", "black");
																									println("* Head of the Engineer Team", "black");
																									println("* AKA The Tinkerer (T.er)", "black");
																									println("* Contributed in the software development of Alpha01", "black");
																									println("* Benefits: Attack Speed Upgrade", "black");
																									println("", "black");
																									println("Lillian Fisher:", "black");
																									println("* Head of the Medical Team", "black");
																									println("* AKA Mother Frankenstein (M.F)", "black");
																									println("* Contributed in the human development of Alpha01", "black");
																									println("* Benefits: Health Upgrade", "black");
																									println("", "black");
																									println("******************", "black");
																									println("", "black");
																									println("", "black");
																									printlnTimer("[Game] As the downloads finish, you come to life     ", "green", 0, 70, function() {
																										printlnTimer("[Game] You must hurry to save Hops and Fisher    ", "green", 0, 70, function() {
																											printlnTimer("[Game] Sadly, there isn't much time, you can only choose to save one   ", "green", 0, 70, function() {
																												printlnTimer("[Game] Choose wisely...          ", "green", 0, 70, function() {
																													println("****DOWNLOADED****", "red");
																													println("Hops Location: Left room", "black");
																													println("Fisher Location: Right room", "black");
																													println("******************", "black");
																													println("[Game] Use WASD to move", "green");
																													println("[Objective] Save either Hops or Fisher", "brown");
																													println("", "black");
																													pause = false;
																													shootable = false;
																													println("[Hops] Over here! Save me!", "black");
																													println("[Fisher] I'm here! I need help!", "black");
																												});
																											});
																										});
																									});
																								});
																							});
																						});
																					});
																				});
																			});
																		});
																	});
																})});
															});
														});
													}, 1000);
												});
											}, 1000); 
										});
									}, 1000);
								});
							});
						});
					});
				});
			});
		});		
	}//chapterOne
	
	function midChapterOne(saved) {
		events["saveHF"] = saved;
		print("[Event] ", "red");
		println("You have chosen to save " + events["saveHF"], "red");
		fadeOut(100, function() {
			window.setTimeout(function() {
				println("", "black");
				println("********DAY TWO********", "blue");
				println("*******HOSPITAL********", "blue");
				println("", "black");
				mainChar.x = 250;
				mainChar.y = 8*50;
				
				//var saved = events["saveHF"]; //saved is a string 
				var notSaved;
				if (saved == "Hops") {
					delete drawDoorMap["Fisher"];
					notSaved = "Fisher";
				} else if (saved == "Fisher") {
					delete drawDoorMap["Hops"];
					notSaved = "Hops";
				}
				drawDoorMap[saved].x = 425;
				drawDoorMap[saved].y = 25;
				
				window.setTimeout(function() {
					fadeIn(90, function() {
						fadeOut(70, function() {
							fadeIn(60, function() {
								fadeOut(50, function() {
									fadeIn(20, function() {
										fadeOut(10, function() {
											fadeIn(5, function() {
												print("[" + saved  + "] ", "black");
												printlnTimer("Thank you Alpha01 so much for saving me", "black", 0, 70, function() {
													print("[" + saved  + "] ", "black");
													printlnTimer("Sadly, " + notSaved + " did not make it out alive", "black", 0, 70, function() {
														print("[" + saved  + "] ", "black");
														printlnTimer("As for me, I am not hurt badly", "black", 0, 70, function() {
															print("[" + saved  + "] ", "black");
															printlnTimer("But you need to start your training as a protector", "black", 0, 70, function() {
																print("[" + saved  + "] ", "black");
																printlnTimer("The facility was breached by our enemies who bombed everything", "black", 0, 70, function() {
																	print("[" + saved  + "] ", "black");
																	printlnTimer("We fought them off but the damage could not be undone", "black", 0, 70, function() {
																		print("[" + saved  + "] ", "black");
																		printlnTimer("Your training will start tomorrow, see you then", "black", 0, 70, function() {
																			fadeOut(50, function() {
																				setTimeout(function() {
																					drawDoorMap[saved].x =25;
																					drawDoorMap[saved].y = 8*50 + 25;
																					mainChar.x = 250;
																					mainChar.y = 8*50;
																					room++;
																					//training
																					println("");
																					println("***********DAY THREE************", "blue");
																					println("********TRAINING GROUNDS********", "blue");
																					println("");
																					fadeIn(40, function() {
																						print("[" + saved  + "] ", "black");
																						printlnTimer("Welcome to the training grounds! Let's start!", "black", 0, 70, function() {
																							print("[" + saved  + "] ", "black");
																							printlnTimer("At the facility, we installed weapons into your systems", "black", 0, 70, function() {
																								print("[" + saved  + "] ", "black");
																								printlnTimer("Press SPACE to activate your weapons", "black", 0, 70, function() {
																									print("[" + saved  + "] ", "black");
																									printlnTimer("Press SPACE again to return to neutral state", "black", 0, 70, function() {
																										print("[" + saved  + "] ", "black");
																										printlnTimer("Use your MOUSE to aim and shoot at the enemy target", "black", 0, 70, function() {
																											print("[Objective] ", "brown");
																											printlnTimer("Press SPACE now, move around, and knock out the targets", "brown", 0, 70, function() {
																												pause = false;
																												shootable = true;
																												enemySpawned += 3;
																												var target1 = new Enemy(mainImgRad, enemySRC, 50, 50, function() {
																													println("[" + saved + "] Nice Shot!", "black");
																												});
																												var target2 = new Enemy(mainImgRad, enemySRC, 250, 50, function() {
																													println("[" + saved + "] Bullseye!", "black");
																												});
																												var target3 = new Enemy(mainImgRad, enemySRC, 450, 50, function() {
																													println("[" + saved + "] Doing Well!", "black");
																												});
																												enemyArr.push(target1);
																												enemyArr.push(target2);
																												enemyArr.push(target3);
																												
																												isDead(function(died) {
																													//TODO bullets hit barrier collision
																													//collision
																													
																													pause = true;
																													shootable = false;
																													switchtoState(neutral);
																													println("");
																													print("["+saved+"] ");
																													printlnTimer("Nice! But becareful, real enemies shoot back!", "black", 0, 70, function() {
																														print("["+saved+"] ");
																														printlnTimer("I'll deploy you into the field tomorrow", "black", 0, 70, function() {
																															print("["+saved+"] ");
																															printlnTimer("But first, I'm going to give you an upgrade, hold still", "black", 0, 70, function() {
																																print("[Game] ", "green");
																																var upgrade;
																																if (saved == "Fisher") {
																																	//health
																																	upgrade = "health";
																																	lives++;
																																} else {
																																	//bullet speed
																																	upgrade = "bullet speed";
																																	maxShoot = 15;
																																}
																																println("You have been given a " + upgrade + " upgrade", "green");
																																fadeOut(40, function() {
																																	room++;
																																	deployFieldChapterOne(saved);
																																});
																															});
																														});
																													});
																												});
																											});
																										});
																									});
																								});
																							});
																						});
																					});
																				}, 500);
																			});
																		});
																	});
																});
															});
														});
													});
												});
											});
										});
									});
								});
							});
						});
					});
				}, 1000);
			});
		}, 1000);
	}
	
	function deployFieldChapterOne(saved) {
		println("");
		println("***********DAY FOUR************", "blue");
		println("**********THE FIELD************", "blue");
		println("");
		mainChar.x = 250;
		mainChar.y = 8*50;
		delete drawDoorMap[saved];
		window.setTimeout(function() {
			fadeIn(40, function() {
				print("[Objective] ", "brown");
				printlnTimer("Protect the target from the ambush", "brown", 0, 70, function() {
					pause = false;
					shootable = true;
					enemyShootable = true;
					enemyShootChance =  60;
					spawnEnemy(50, 50);
					spawnEnemy(250, 50);
					spawnEnemy(450, 50);
					spawnEnemy(100, 100);
					spawnEnemy(200, 100);
					spawnEnemy(300, 100);
					spawnEnemy(400, 100);
					spawnEnemy(150, 150);
					spawnEnemy(350, 150);
					isDead(function(died) {
						pause = true;
						shootable = false;
						enemyShootable = false;
						if (died == "main") {
							println("Awwww... you died...");
							fadeOut(50, function() {
								for (var i = 0; i < 25; i++) {
									println("");
								}
								lives = 1;
								if (saved == "Fisher") {
									lives++;
								}
								enemyDead = enemySpawned;
								enemyArr = [];
								switchtoState(neutral);
								deployFieldChapterOne();
							});
						} else if (died == "enemy") {
							println("Well Done! You protected the target!");
							fadeOut(40, function() {
							
							});
						}
					});
				});
			});
		}, 1000);
	}
	
	function isDead(callback) {
		var timer = window.setInterval(function() {
			if (enemyDead == enemySpawned) {
				clearInterval(timer);
				callback && callback("enemy");
			}
			if (lives == 0) {
				clearInterval(timer);
				callback && callback("main");
			}
		}, 20);
	}
	
	function fadeIn(interval, callback) {
		if (alpha < 1) {
			alpha += delta;
			window.setTimeout(function() {fadeIn(interval, callback)}, interval);
		} else callback && callback();
	}
	
	function fadeOut(interval, callback) {
		if (alpha > 0) {
			alpha -= delta;
			window.setTimeout(function() {fadeOut(interval, callback)}, interval);
		} else callback && callback();
	}

	class Enemy {
		constructor(enemyRad, enemySRC, x, y, onHit) {
			this.enemyRad = enemyRad;
			this.enemySRC = enemySRC;
			this.enemyImg = new Image();
			this.enemyImg.src = this.enemySRC;
			this.x = x - this.enemyRad;
			this.y = y - this.enemyRad;	
			this.callback = function() {onHit && onHit()};
		}
	}
	
	
	function mouseDown(e) {
		if (shootable) {
			if (shootTimer >= maxShoot) {
				if (mainState == attack) {
					bulShot++;
					
					var dx;
					var dy;
					if (e.y >= mainChar.y) {
						dx = ((e.x-crosshair.width) - mainChar.x);
						dy = ((e.y-crosshair.height) - mainChar.y);
					} else {
						dx = ((e.x-crosshair.width/2) - mainChar.x);
						dy = ((e.y-crosshair.height/2) - mainChar.y);
					}
					var mag = (Math.sqrt(dx * dx + dy * dy));

					var bullet = new Bullet(mainChar.x, mainChar.y, e.x, e.y, playerID);
					var lastBul = bulletArr.push(bullet) - 1;
					//bulletArr[lastBul].velocityX = Math.floor((dx / mag) * bullet.speed);
					//bulletArr[lastBul].velocityY = Math.floor(dy / mag * bullet.speed);
					//bulletArr[lastBul].velocityX = Math.floor(dx/bullet.speed);
					//bulletArr[lastBul].velocityY = Math.floor(dy/bullet.speed);
					
					var rotation = Math.atan2(dy, dx);

					bulletArr[lastBul].velocityX =  Math.cos(rotation) * bullet.speed;
					bulletArr[lastBul].velocityY = Math.sin(rotation) * bullet.speed;
										
					
					shootTimer = 0;
				}
			}
		}
	}
	
	function enemyShoot(idx) {
		if (enemyArr.length > 0) {
			//var num = randomNum(0, enemyArr.length-1);
			var enemy = enemyArr[idx];
			//println(num);
			var dx = (mainChar.x - enemy.x);
			var dy = (mainChar.y - enemy.y);
			var mag = (Math.sqrt(dx * dx + dy * dy));

			var bullet = new Bullet(enemy.x + enemy.enemyRad, enemy.y + enemy.enemyRad, mainChar.x + mainImgRad, mainChar.y + mainImgRad, enemyID);
			var lastBul = bulletArr.push(bullet) - 1;
			bulletArr[lastBul].velocityX = Math.floor(dx / mag * bullet.speed);
			bulletArr[lastBul].velocityY = Math.floor(dy / mag * bullet.speed);
		}
	}

	function doScaledTimeout(i, interval) {
	  setTimeout(function() {
		println(i);
	  }, i * interval);
	}
	
	function mouseMove(e) {
		mouse.x = e.x;
		mouse.y = e.y;
	}
		
	function keyDown(e) {
		/*
		if (e.keyCode == 80) {
			//'P'
			console.log(pause);
			if (!pause) {
				pause = true;
				shootable = !pause;
			} else {
				pause = false;
				shootable = !pause;
			}
		}*/
		if (!pause) {
			var dir;
			if(e.keyCode == 87) {
				//'W'
				moveChar(up);
				dir = up;
			}
			if(e.keyCode == 83) {
				//'S'
				moveChar(down);
				dir = down;
			}	
			if(e.keyCode == 65) {
				//'A'
				moveChar(left);
				dir = left;
			}
			if(e.keyCode == 68) {
				//'D'
				moveChar(right);
				dir = right;
			}
			if(e.keyCode == 32) {
				//space
				if (shootable) {
					if (mainState == neutral) {
						switchtoState(attack);
					} else if(mainState == attack) {
						switchtoState(neutral);
					}
				}
			}
			checkWalls(dir);
			checkDoors();
		}
	}
	
	function switchtoState(state) {
		if (state == attack) {
			mainState = attack;
			mainImg.src=attackImg;
		} else if(state == neutral) {
			mainState = neutral;
			mainImg.src=neutralImg;
		}
	}
	
	function checkDoors() {
		for (key in drawDoorMap) {
			var door = doorMap[key];
			if (door.x == mainChar.x - mainImgRad && door.y == mainChar.y - mainImgRad) {
				pause = true;
				shootable = false;
				enemyShootable = false;
				door.callback();
			}
		}
	}
	
	function moveChar(dir) {
		if (dir == up) {
			mainChar.y -= dy;
		} 
		if (dir == down) {
			mainChar.y += dy;
		}
		if (dir == left) {
			mainChar.x -= dx;
		}
		if (dir == right) {
			mainChar.x += dx;
		}
	}
		
	function isCollide(x1, y1, radius1, x2, y2, radius2) {
		var dist = ((x1 - x2) * (x1-x2) + (y1-y2) * (y1-y2));
		//console.log("Dist: " + width2);
		if (dist <= Math.pow((radius1 + radius2), 2)) return true;
		return false;
	}
	
	function rectCircleColliding(cx, cy, cr, rx, ry, rh, rw){
		var distX = Math.abs(cx - rx - rw/2);
		var distY = Math.abs(cy - ry - rh/2);

		if (distX > (rw/2 + cr)) { return false; }
		if (distY > (rh/2 + cr)) { return false; }

		if (distX <= (rw/2)) { return true; } 
		if (distY <= (rh/2)) { return true; }

		var dx=distX-rw/2;
		var dy=distY-rh/2;
		return (dx*dx+dy*dy<=(cr*cr));
	}

	function checkWalls(dir) {
	/*
		if (mainChar.x <= mainImgRad) {
			mainChar.x = mainImgRad * 2;
		} else if (mainChar.x >= 450) {
			mainChar.x = 500 - mainImgRad * 2;
		}
		
		if (mainChar.y <= mainImgRad) {
			mainChar.y = mainImgRad * 2;
		} else if (mainChar.y >= 450) {
			mainChar.y = 500- mainImgRad * 2;
		}
	*/
		
		var x = Math.floor((mainChar.x) / (mainImgRad*2));
		var y = Math.floor((mainChar.y) / (mainImgRad*2));
		//println(x + " + " + y);
		if (terrainBound[room][y][x] == 1) {
			if (dir == up) {
				mainChar.y += mainImgRad*2;
			} else if (dir == down) {
				mainChar.y -= mainImgRad*2;
			} else if (dir == left) {
				mainChar.x += mainImgRad*2;
			} else if (dir == right) {
				mainChar.x -= mainImgRad*2;
			}
		}
		//println(terrainBound[room][y][x]);
	}

	function onTick() {
		window.setTimeout(onTick, 20);
		if (shootable) {
			shootTimer++;
		}
		drawScreen();
	}
	
	function perSec() {
		window.setTimeout(perSec, 1000);
		if (enemyShootable) {
			for (var i = 0; i < enemyArr.length; i++) {
				if (randomBool(enemyShootChance)) {
					enemyShoot(i);
				}
			}
		}
	}

	function randomNum(min, max) {
	   var range = (max - min) + 1;     
	   return Math.floor((Math.random() * range) + min);
	}
	
	function randomBool(per) {
		//assuming that per is 0 - 100
		per /= 100;
		//println(per);
		return Math.random() <= per;
	}


	function spawnEnemy(x, y) {
		//var xCoor = randomNum(0, Math.round(document.getElementById("myCanvas").width / dx) - 3);
		//println(xCoor);
		var enemy1 = new Enemy(mainImgRad, enemySRC, x, y);
		enemySpawned++;
		//println(enemy1.x);
		//println(xCoor * dx);
		//println(enemy1.y);
		
		enemyArr.push(enemy1);
	}
		
	function drawScreen() {
		var canvas = document.getElementById("myCanvas");
		var context = canvas.getContext("2d");
		var height = canvas.height;
		var width = canvas.width;
		var div = document.getElementById("myDiv");
	
		context.clearRect(0, 0, 500, 500);
		
		/*
		div.style.backgroundImage = terrainImg[room];
		div.style.backgroundRepeat = "no-repeat";
		div.style.backgroundSize = "500px 500px";
		*/
		context.globalAlpha = alpha;
		
		
		var img = new Image();
		img.src = terrainImg[room];
		context.drawImage(img, 0, 0, width, height);
		
		context.setLineDash([1, 1]);/*dashes are 1px and spaces are 1px*/
		for (var i = 0; i < height / (dy); i++) {
			context.beginPath();
			context.moveTo(0, i * (dy));
			context.lineTo(width, i * (dy));
			context.stroke();
		}
		
		for (var i = 0; i < width / (dx); i++) {
			context.beginPath();
			context.moveTo(i * (dx), 0);
			context.lineTo(i * (dx), height);
			context.stroke();
		}
		//boundary
		
		for (var q = 0; q < terrainBound[room].length; q++) {
			for (var k = 0; k < terrainBound[room][q].length; k++) {
				if (terrainBound[room][q][k] == 1) {
					context.drawImage(boundary, -mainImgRad + mainImgRad*2*k, -mainImgRad + mainImgRad*2*q, mainImgRad*2, mainImgRad*2);
				}
			}
		}
		
		//enemy
		for (var i = 0; i < enemyArr.length; i++) {
			var enemy = enemyArr[i];
			context.drawImage(enemy.enemyImg, enemy.x, enemy.y, enemy.enemyRad * 2, enemy.enemyRad * 2);
		}
		//doors
		for (key in drawDoorMap) {
			var door = drawDoorMap[key];
			context.drawImage(door.img, door.x, door.y, mainImgRad*2, mainImgRad*2);
		}
		
		//bullet
		for (var i = 0; i < bulletArr.length; i++) {
			var bullet = bulletArr[i];
			bullet.x += bullet.velocityX;
			bullet.y += bullet.velocityY;
			context.drawImage(bulletImg, bullet.x, bullet.y, bullet.width, bullet.height);
			
			//boundary
			
			for (var j = 0; j < terrainBound[room].length; j++) {
				for (var k = 0; k < terrainBound[room][j].length; k++) {
					if (terrainBound[room][j][k] == 1) {
						if (rectCircleColliding(Math.ceil(bullet.x), Math.ceil(bullet.y), bullet.width/2, -25 + mainImgRad*2*k, -25 + mainImgRad*2*j, mainImgRad*2, mainImgRad*2)) {
							bulletArr.splice(i, 1);
							bulDeleted++;
							i--;
						}
					}
				}
			}
			/*
			if (bullet.x >= canvas.width || bullet.x <= 0 || bullet.y >= canvas.height || bullet.y <= 0) {
				bulletArr.splice(i, 1);
				bulDeleted++;
				//console.log("deleted: " + bulDeleted + " shot: " + bulShot);
			}*/
			
			if (bullet.shotFrom == playerID) {
				for (var j = 0; j < enemyArr.length; j++) {
					var enemy = enemyArr[j];
					//console.log("bulX: " + bullet.x + "  bulY: " + bullet.y);
					//console.log("enemyX: " + enemy.x + " enemyY: " + enemy.y);
					//if (isCollide(Math.ceil(bullet.x), Math.ceil(bullet.y), bullet.width, bullet.height, enemy.x, enemy.y, enemy.enemyRad * 2, enemy.enemyRad * 2)) {
					if (isCollide(enemy.x, enemy.y, enemy.enemyRad, Math.ceil(bullet.x), Math.ceil(bullet.y), bullet.width / 2)) {
					//if (rectCircleColliding(enemy.x, enemy.y, enemy.enemyRad, Math.ceil(bullet.x), Math.ceil(bullet.y), bullet.width, bullet.height)) {
						//delete enemy
						enemyArr.splice(j, 1);
						bulletArr.splice(i, 1);
						bulDeleted++;
						//console.log("HIT");
						i--;
						enemyDead++;
						enemy.callback();
					}
				}
			} else if (bullet.shotFrom == enemyID) {
				//if (isCollide(Math.ceil(bullet.x), Math.ceil(bullet.y), bullet.width, bullet.height, mainChar.x + mainImgRad, mainChar.y + mainImgRad, mainImgRad * 2, mainImgRad * 2)) {
				if (isCollide(mainChar.x, mainChar.y, mainImgRad, Math.ceil(bullet.x), Math.ceil(bullet.y), bullet.width / 2)) {
				//if (rectCircleColliding(mainChar.x, mainChar.y, mainImgRad, Math.ceil(bullet.x), Math.ceil(bullet.y), bullet.width, bullet.height)) {
					bulletArr.splice(i, 1);
					i--;
					//shot player
					if (lives > 0) {
						lives--;
						println("[Lives] " + lives + " left", "red");
					}
				}
				
			}
			
		}
		//crosshair
		if(mainState == attack) {
			context.drawImage(crosshair, mouse.x - crosshair.width , mouse.y - crosshair.height*2 , crosshair.width, crosshair.height);
		}
		
		
		//player
		var center_x = mainChar.x + mainImg.width / 2;
	    var center_y = mainChar.y + mainImg.height / 2;
	    var angle = -Math.atan2(mouse.x - center_x, mouse.y - center_y);
		
	    rotateImg(context, mainImg, angle, mainChar.x, mainChar.y, mainImg.width / 2, mainImg.height / 2);
		
		
		
	}
	
	function rotateImg(context, image, angleInRad, positionX, positionY, axisX, axisY) {
	  context.translate(positionX, positionY);
	  context.rotate(angleInRad);
	  context.drawImage(image, -axisX, -axisY, mainImgRad * 2, mainImgRad * 2);
	  context.rotate(-angleInRad);
	  context.translate(-positionX, -positionY);
	}

	function println(words, color) {
		var console = document.getElementById("console");
		var linebr = document.createElement("br");
		var span = document.createElement('span');
		span.style.color = color;
		console.append(span);
		span.append(words);
		span.append(linebr);
		console.scrollTop += 50;
	}

	function printlnTimer(message, color, index, interval, callback) {
	  var console = document.getElementById("console");
	  if (index < message.length) { 
		var span = document.createElement('span');
		span.style.color = color;
		console.append(span);
		span.append(message[index++]); 
		timer += interval;
		setTimeout(function () { printlnTimer(message, color, index, interval, callback); }, interval); 
	  } else {
		var linebr = document.createElement("br");
		console.append(linebr);
		callback && callback();
	  }
	  console.scrollTop += 50;
	};

	function print(words, color) {
		var console = document.getElementById("console");
		var span = document.createElement('span');
		span.style.color = color;
		console.append(span);
		span.append(words);
		console.scrollTop += 50;
	}

	function printTimer(message, color, index, interval, callback) {
	  var console = document.getElementById("console");
	  
	  if (index < message.length) { 
		var span = document.createElement('span');
		span.style.color = color;
		console.append(span);
		span.append(message[index++]); 
		timer += interval;
		setTimeout(function () { printTimer(message, color, index, interval, callback); }, interval); 
	  } else {
		callback && callback();
	  }
	  console.scrollTop += 50;
	};


</script>
</head><body onload="start()" bgColor="black">


<table>
<tr height="100%">
<td width="50%">
<div id="myDiv">
<canvas id="myCanvas" width="500" height="500">
Your browser does not support the HTML5 canvas tag.
</canvas></div></td>


<td width="50%">
<div id="div2" style="text-align:center" >
<pre id="console"></pre></div>
</td>
</tr>
</table>
</body>
</html>
