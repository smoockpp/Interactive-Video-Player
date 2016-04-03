
	var videoPlayerUI = {
		// Defining Video controls elements
		myVideo: document.getElementById('#myVIdeo'),
		videoPlayer: $('#video-player'),
		videoControls: $('#video-controls'),
		buttonPlay: $('#button-play'),
		buttonPause: $('#button-pause'),
		buttonReplay: $('#button-replay'),
		timeCurrent: $('#time-current'),
		timeDuration: $('#time-duration'),
		timeBar: $('#time-bar'),
		bufferBar: $('#buffer-bar'),
		progressSeekBar: $('#progress-bar'),
		buttonFullscreen: $('#button-fullscreen'),
		buttonVolOn: $('#volume-on'),
		buttonVolOff: $('#volume-off'),
		volumeBar: $('#volume-bar'),
		volumeSlide: $('#volume-slide'),
		buttonCaptions: $('#button-captions'),
		captionsContainer: $('#captions-container'),
		buttonRadio1: $('#on'),
		buttonRadio2: $('#off'),
		playSpeedContainer: $('#play-speed-container'),
		buttonPlaySpeed: $('#button-play-speed'),
		buttonSpeed20x: $('#speed20'),
		buttonSpeed15x: $('#speed15'),
		buttonSpeed10x: $('#speed10'),
		buttonSpeed05x: $('#speed05'),
		// Defining transcript elements
		transcriptContainer: $('.transcript'),
		ph01: $('.ph01'),
		ph02: $('.ph02'),
		ph03: $('.ph03'),
		ph04: $('.ph04'),
		ph05: $('.ph05'),
		ph06: $('.ph06'),
		ph07: $('.ph07'),
		ph08: $('.ph08'),
		ph09: $('.ph09'),
		ph10: $('.ph10'),
		ph11: $('.ph11'),
		ph12: $('.ph12'),
		ph13: $('.ph13'),
		ph14: $('.ph14'),
		ph15: $('.ph15'),
		ph16: $('.ph16'),

		// Functions and events

		// Show and hide controls functions for mouseenter and mouseleave events
		showControls: function() {
			$("#myVideo").on('mouseenter', function() {
				videoPlayerUI.videoControls.css('opacity', '1');
				videoPlayerUI.progressSeekBar.css('bottom', '70px');
				videoPlayerUI.progressSeekBar.css('opacity', '1');
				
			});
			this.videoControls.on('mouseenter', function() {
				videoPlayerUI.videoControls.css('opacity', '1');
				videoPlayerUI.progressSeekBar.css('bottom', '70px');
				videoPlayerUI.progressSeekBar.css('opacity', '1');
				
			});
			this.progressSeekBar.on('mouseenter', function() {
				videoPlayerUI.videoControls.css('opacity', '1');
				videoPlayerUI.progressSeekBar.css('bottom', '70px');
				videoPlayerUI.progressSeekBar.css('opacity', '1');

			});
		},
		hideControls: function() {
			$("#myVideo").on('mouseleave', function() {
				videoPlayerUI.videoControls.css('opacity', '0');
				videoPlayerUI.progressSeekBar.css('bottom', '30px');
				videoPlayerUI.progressSeekBar.css('opacity', '.6');
				
			});
			this.videoControls.on('mouseleave', function() {
				videoPlayerUI.videoControls.css('opacity', '0');
				videoPlayerUI.progressSeekBar.css('bottom', '30px');
				videoPlayerUI.progressSeekBar.css('opacity', '.6');
				
			});
			this.progressSeekBar.on('mouseleave', function() {
				videoPlayerUI.videoControls.css('opacity', '0');
				videoPlayerUI.progressSeekBar.css('bottom', '30px');
				videoPlayerUI.progressSeekBar.css('opacity', '.6');
				
			});
		},

		// Function to check if video has ended
		hasEnded: function() {
			$(myVideo).bind('ended', function() {
				videoPlayerUI.buttonPause.css("display", "none");
				videoPlayerUI.buttonPlay.css("display", "inline-block");	
			});
		},

		// Function for play video and change button to pause
		playVideo: function() {
			myVideo.play();
			this.buttonPause.css("display", "inline-block");
			this.buttonPlay.css("display", "none");
		},

		// Function for pausing video and changing the button to play
		pauseVideo: function() {
			myVideo.pause();
			this.buttonPause.css("display", "none");
			this.buttonPlay.css("display", "inline-block");
		},

		// Function to reset the video to 0 
		replayVideo: function() {
			myVideo.pause();
			myVideo.currenttime = 0;
			myVideo.load();
			this.timeBar.css('width', '0');
			this.buttonPause.css("display", "none");
			this.buttonPlay.css("display", "inline-block");

		},

		// Function to get video duration and write it to document
		videoDuration: function() {

			if (myVideo.buffered.length > 0) {
				var videoDuration = myVideo.duration;
				var minutes = Math.floor(videoDuration / 60);
				var seconds = Math.floor(videoDuration);
				this.timeDuration.html(" " + minutes + ":" + seconds);
			}
		
		},

		//Function to update current time and write it to document 
		timeUpdate: function() {
			$(myVideo).on("timeupdate", function() {
				var time = myVideo.currentTime;
				var minutes = Math.floor(time / 60);   
				var seconds = Math.floor(time);
				function addZero() {
					if (seconds < 10) {
						seconds = '0' + Math.floor(time);
					}	
				}		
				if (myVideo.readyState > 0 ) {
					var time = myVideo.currentTime;
					var minutes = Math.floor(time / 60);
					var seconds = Math.floor(time);
					addZero();
					videoPlayerUI.timeCurrent.html(minutes + ":" + seconds + ' /');
				}
				addZero();
		        videoPlayerUI.timeCurrent.html(minutes + ":" + seconds + ' /');
			});
		},

		// Function to update the progress bar on timeupdate event and set its width respectively
		progressBar: function() {
			$(myVideo).bind("timeupdate", function() {
				var currentPos = this.currentTime; //Get currenttime
				var maxduration =this.duration; //Get video duration
				var percentage = 100 * currentPos / maxduration; 
				videoPlayerUI.timeBar.css("width", percentage + '%');
			});
		},

		// Function to update the buffer bar 
		bufferedBar: function() {
			function updateLoadProgress() {
				if (myVideo.buffered.length > 0) {
					var percent = (myVideo.buffered.end(0) / myVideo.duration) * 100;
					videoPlayerUI.bufferBar.css("width", percent + '%');
				}
			}
			$(myVideo).bind("progress", function() {
				updateLoadProgress();
			});
			$(myVideo).bind("loadeddata", function() {
				updateLoadProgress();
			});
			$(myVideo).bind("canplaythrough", function() {
				updateLoadProgress();
			});
			$(myVideo).bind("playing", function() {
				updateLoadProgress();
			});
		},

		// Function to allow dragging and clicking the progress bar and update video state respectively 
		seekableBar: function() {
			var timeDrag = false; // set drag default to false
			this.progressSeekBar.mousedown(function(e) {
				timeDrag = true;
				videoPlayerUI.pauseVideo();
				updatebar(e.pageX);
				
			});
			$(document).mouseup(function(e) {
					if (timeDrag) {
						timeDrag = false;
						updatebar(e.pageX);
						videoPlayerUI.playVideo();
					} 
				});
			$(document).mousemove(function(e) {
			    if (timeDrag) {
			        updatebar(e.pageX);
			    }
			});
				var updatebar = function(x) {
				    var progress = videoPlayerUI.progressSeekBar;
				    var maxduration = myVideo.duration; 
				    var position = x - progress.offset().left; 
				    var percentage = 100 * position / progress.width();
				 
				
				    if(percentage > 100) {
				        percentage = 100;
				    }
				    if(percentage < 0) {
				        percentage = 0;
				    }
				 
			
				    videoPlayerUI.timeBar.css('width', percentage +'%');
				    myVideo.currentTime = maxduration * percentage / 100;
				};
			},

			// Function to call fullscreen mode for Firefox, Chrome, Safari and IE
			fullscreen: function() {
				if (myVideo.requestFullscreen) {
				    myVideo.requestFullscreen();
		
				} else if (myVideo.mozRequestFullScreen) {
				    myVideo.mozRequestFullScreen();// Firefox

				} else if (myVideo.webkitRequestFullscreen) {
				    myVideo.webkitRequestFullscreen(); // Chrome and Safari

				} else if (myVideo.msRequestFullscreen) {
					myVideo.msRequestFullscreen(); // IE

				}
				
			},

			// Function to mute video
			muteVideo: function() {
				myVideo.muted = true;
				this.buttonVolOn.css("display", "none");
				this.buttonVolOff.css("display", "inline-block");
				this.volumeSlide.css("opacity", "0");
			},

			// Function to unmute video
			unMuteVideo: function() {
				
				myVideo.muted = false;
				this.buttonVolOff.css("display", "none");
				this.buttonVolOn.css("display", "inline-block");
				this.volumeSlide.css("opacity", "1");
			},

			// Function to allow dragging and click the volume bar
			volumeControl: function() {
				var volumeDrag = false; 
				this.volumeBar.mousedown(function(e) {
					volumeDrag = true;
					myVideo.muted = false;
					videoPlayerUI.updateVolume(e.pageX);
				});
				$(document).mouseup(function(e) {
					if (volumeDrag) {
						volumeDrag = false;
						videoPlayerUI.updateVolume(e.pageX);
					} 
				});
				$(document).mousemove(function(e) {
				    if (volumeDrag) {
				        videoPlayerUI.updateVolume(e.pageX);
				    }
				});
			},

			// Function to update the volume bar respectively
			updateVolume: function(x, vol) {
			    var volume = videoPlayerUI.volumeBar;
			    var percentage;
			
			    if(vol) {
			        percentage = vol * 100;
			    }
			    else {
			        var position = x - volume.offset().left;
			        percentage = 100 * position / volume.width();
			    }
			    if(percentage > 100) {
			        percentage = 100;
			    }
			    if(percentage < 0) {
			        percentage = 0;
			        videoPlayerUI.muteVideo();
			    } else {
			    	videoPlayerUI.unMuteVideo();
			    }
				
				myVideo.volume = percentage / 100;
			    videoPlayerUI.volumeSlide.css('width', percentage + '%');
			    
			},

			// Function to toggle captions container on
			toggleCaptionsOn: function() {
				videoPlayerUI.captionsContainer.css('z-index', '10000');
			},

			// Function to toggle captions container off
			toggleCaptionsOff: function() {
				videoPlayerUI.captionsContainer.css('z-index', '-1');
			},

			// Function to toggle play speed container on
			togglePlaySpeedOn: function() {
				videoPlayerUI.playSpeedContainer.css('z-index', '10000');
			},

			// Function to toggle play speed container off
			togglePlaySpeedOff: function() {
				videoPlayerUI.playSpeedContainer.css('z-index', '-1');
			},

			// Function for switching on and off closed captions
			captionsOnOff: function() {
				for (var i = 0; i < myVideo.textTracks.length; i++) {
				   myVideo.textTracks[i].mode = 'hidden';
				}
				videoPlayerUI.buttonRadio1.click(function() {
					for (var i = 0; i < myVideo.textTracks.length; i++) {
					  	myVideo.textTracks[i].mode = 'showing';
					}
				});
				videoPlayerUI.buttonRadio2.click(function() {
					for (var i = 0; i < myVideo.textTracks.length; i++) {
					   myVideo.textTracks[i].mode = 'hidden';
					}
				});
			},

			// Function to set playback rate to 2x
			playSpeed20x: function() {
				myVideo.playbackRate = 2.0;
			},

			// Function to set playback rate to 1.5x
			playSpeed15x: function() {
				myVideo.playbackRate = 1.5;
			},

			// Function to set playback rate to 1x
			playSpeed10x: function() {
				myVideo.playbackRate = 1;
			},

			// Function to set playback rate to 0.5x
			playSpeed05x: function() {
				myVideo.playbackRate = 0.5;
			},

			// Function to hilight current phrase on timeupdate event
			transcriptHighlight: function() {
				$(myVideo).on('timeupdate', function() {
					var currTime = myVideo.currentTime;
					if (currTime > 0 && currTime < 4 ) {
						videoPlayerUI.ph01.css('color', 'rgba(240,149,0,1.00)');
					} else {
						videoPlayerUI.ph01.css('color', 'black');
					}
					if (currTime > 4 && currTime < 7.5 ) {
						videoPlayerUI.ph02.css('color', 'rgba(240,149,0,1.00)');
					} else {
						videoPlayerUI.ph02.css('color', 'black');
					}
					if (currTime > 7.5 && currTime < 11.2 ) {
						videoPlayerUI.ph03.css('color', 'rgba(240,149,0,1.00)');
					} else {
						videoPlayerUI.ph03.css('color', 'black');
					}
					if (currTime > 11.2 && currTime < 14 ) {
						videoPlayerUI.ph04.css('color', 'rgba(240,149,0,1.00)');
					} else {
						videoPlayerUI.ph04.css('color', 'black');
					}
					if (currTime > 14 && currTime < 18 ) {
						videoPlayerUI.ph05.css('color', 'rgba(240,149,0,1.00)');
					} else {
						videoPlayerUI.ph05.css('color', 'black');
					}
					if (currTime > 18 && currTime < 22.4 ) {
						videoPlayerUI.ph06.css('color', 'rgba(240,149,0,1.00)');
					} else {
						videoPlayerUI.ph06.css('color', 'black');
					}
					if (currTime > 22.4 && currTime < 26.9 ) {
						videoPlayerUI.ph07.css('color', 'rgba(240,149,0,1.00)');
					} else {
						videoPlayerUI.ph07.css('color', 'black');
					}
					if (currTime > 26.9 && currTime < 31 ) {
						videoPlayerUI.ph08.css('color', 'rgba(240,149,0,1.00)');
					} else {
						videoPlayerUI.ph08.css('color', 'black');
					}
					if (currTime > 32.1 && currTime < 34.7 ) {
						videoPlayerUI.ph09.css('color', 'rgba(240,149,0,1.00)');
					} else {
						videoPlayerUI.ph09.css('color', 'black');
					}
					if (currTime > 34.7 && currTime < 39.5 ) {
						videoPlayerUI.ph10.css('color', 'rgba(240,149,0,1.00)');
					} else {
						videoPlayerUI.ph10.css('color', 'black');
					}
					if (currTime > 39.5 && currTime < 41.2 ) {
						videoPlayerUI.ph11.css('color', 'rgba(240,149,0,1.00)');
					} else {
						videoPlayerUI.ph11.css('color', 'black');
					}
					if (currTime > 42.3 && currTime < 46.3 ) {
						videoPlayerUI.ph12.css('color', 'rgba(240,149,0,1.00)');
					} else {
						videoPlayerUI.ph12.css('color', 'black');
					}
					if (currTime > 46.3 && currTime < 49.3 ) {
						videoPlayerUI.ph13.css('color', 'rgba(240,149,0,1.00)');
					} else {
						videoPlayerUI.ph13.css('color', 'black');
					}
					if (currTime > 49.3 && currTime < 53.7 ) {
						videoPlayerUI.ph14.css('color', 'rgba(240,149,0,1.00)');
					} else {
						videoPlayerUI.ph14.css('color', 'black');
					}
					if (currTime > 53.8 && currTime < 57.8 ) {
						videoPlayerUI.ph15.css('color', 'rgba(240,149,0,1.00)');
					} else {
						videoPlayerUI.ph15.css('color', 'black');
					}
					if (currTime > 57.8 && currTime < 59 ) {
						videoPlayerUI.ph16.css('color', 'rgba(240,149,0,1.00)');
					} else {
						videoPlayerUI.ph16.css('color', 'black');
					}
				});
				
			},

			// Function to allow clicking on a phrase to set video current time respectively
			transcriptClick: function() {
				videoPlayerUI.ph01.click(function() {
					myVideo.currentTime = 0;
					videoPlayerUI.playVideo();
				});
				videoPlayerUI.ph02.click(function() {
					myVideo.currentTime = 4;
					videoPlayerUI.playVideo();
				});
				videoPlayerUI.ph03.click(function() {
					myVideo.currentTime = 7.5;
					videoPlayerUI.playVideo();
				});
				videoPlayerUI.ph04.click(function() {
					myVideo.currentTime = 11.2;
					videoPlayerUI.playVideo();
				});
				videoPlayerUI.ph05.click(function() {
					myVideo.currentTime = 14;
					videoPlayerUI.playVideo();
				});
				videoPlayerUI.ph06.click(function() {
					myVideo.currentTime = 18;
					videoPlayerUI.playVideo();
				});
				videoPlayerUI.ph07.click(function() {
					myVideo.currentTime = 22.4;
					videoPlayerUI.playVideo();
				});
				videoPlayerUI.ph08.click(function() {
					myVideo.currentTime = 26.9;
					videoPlayerUI.playVideo();
				});
				videoPlayerUI.ph09.click(function() {
					myVideo.currentTime = 32.1;
					videoPlayerUI.playVideo();
				});
				videoPlayerUI.ph10.click(function() {
					myVideo.currentTime = 34.7;
					videoPlayerUI.playVideo();
				});
				videoPlayerUI.ph11.click(function() {
					myVideo.currentTime = 39.5;
					videoPlayerUI.playVideo();
				});
				videoPlayerUI.ph12.click(function() {
					myVideo.currentTime = 42.3;
					videoPlayerUI.playVideo();
				});
				videoPlayerUI.ph13.click(function() {
					myVideo.currentTime = 46.3;
					videoPlayerUI.playVideo();
				});
				videoPlayerUI.ph14.click(function() {
					myVideo.currentTime = 49.3;
					videoPlayerUI.playVideo();
				});
				videoPlayerUI.ph15.click(function() {
					myVideo.currentTime = 53.8;
					videoPlayerUI.playVideo();
				});
				videoPlayerUI.ph16.click(function() {
					myVideo.currentTime = 57.8;
					videoPlayerUI.playVideo();
				});
			},

			// Function to load controls
			loadControls: function() {
					videoPlayerUI.hasEnded();
					videoPlayerUI.timeUpdate();
					videoPlayerUI.progressBar();
					videoPlayerUI.bufferedBar();
					videoPlayerUI.seekableBar();
					videoPlayerUI.volumeControl();
					videoPlayerUI.transcriptHighlight();
					videoPlayerUI.transcriptClick();
					videoPlayerUI.showControls();
					videoPlayerUI.hideControls();
					videoPlayerUI.videoDuration();
				
			}
	};




setInterval(function(t) {
	videoPlayerUI.loadControls();
}, 1000);
	
videoPlayerUI.captionsOnOff();
		

videoPlayerUI.buttonPlay.click(function() {
	videoPlayerUI.playVideo();
});

videoPlayerUI.buttonPause.click(function() {
	videoPlayerUI.pauseVideo();
});

videoPlayerUI.buttonReplay.click(function() {
	videoPlayerUI.replayVideo();
});

videoPlayerUI.buttonFullscreen.click(function() {
	videoPlayerUI.fullscreen();
});

videoPlayerUI.buttonVolOn.click(function() {
	videoPlayerUI.muteVideo();
});

videoPlayerUI.buttonVolOff.click(function() {
	videoPlayerUI.unMuteVideo();
});	
	
videoPlayerUI.buttonCaptions.mouseover(function() {
	videoPlayerUI.toggleCaptionsOn();
	videoPlayerUI.captionsContainer.mouseover(function() {
		videoPlayerUI.toggleCaptionsOn();
	});
	videoPlayerUI.captionsContainer.mouseout(function() {
		videoPlayerUI.toggleCaptionsOff();
	});
	videoPlayerUI.buttonCaptions.mouseout(function() {
		videoPlayerUI.toggleCaptionsOff();
	});
});	

videoPlayerUI.buttonPlaySpeed.mouseover(function() {
	videoPlayerUI.togglePlaySpeedOn();
	videoPlayerUI.playSpeedContainer.mouseover(function() {
		videoPlayerUI.togglePlaySpeedOn();
	});
	videoPlayerUI.playSpeedContainer.mouseout(function() {
		videoPlayerUI.togglePlaySpeedOff();
	});
	videoPlayerUI.buttonPlaySpeed.mouseout(function() {
		videoPlayerUI.togglePlaySpeedOff();
	});
});

videoPlayerUI.buttonSpeed20x.bind('click', function() {
	videoPlayerUI.playSpeed20x();
});
videoPlayerUI.buttonSpeed15x.bind('click', function() {
	videoPlayerUI.playSpeed15x();
});
videoPlayerUI.buttonSpeed10x.bind('click', function() {
	videoPlayerUI.playSpeed10x();
});
videoPlayerUI.buttonSpeed05x.bind('click', function() {
	videoPlayerUI.playSpeed05x();
});

$(myVideo).click(function() {
	if (this.paused === false) {
		videoPlayerUI.pauseVideo();
	} else
	if (this.paused === true) {
		videoPlayerUI.playVideo();
	}
});	






