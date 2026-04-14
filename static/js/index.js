window.HELP_IMPROVE_VIDEOJS = false;


$(document).ready(function() {
    // Check for click events on the navbar burger icon

    var options = {
			slidesToScroll: 1,
			slidesToShow: 1,
			loop: true,
			infinite: true,
			autoplay: true,
			autoplaySpeed: 5000,
    }

		// Initialize all div with carousel class
    var carousels = bulmaCarousel.attach('.carousel', options);
	
    bulmaSlider.attach();

    // Visual Results: thumbnail click to switch video group
    $('.vr-thumb').on('click', function () {
        var groupIdx = $(this).data('group');

        // Update active thumbnail
        $('.vr-thumb').removeClass('active');
        $(this).addClass('active');

        // Pause all videos in currently visible group, then hide it
        $('.vr-group-active').find('video').each(function () {
            this.pause();
        });
        $('.vr-group').removeClass('vr-group-active');

        // Show selected group and play its videos
        var $target = $('.vr-group[data-group="' + groupIdx + '"]');
        $target.addClass('vr-group-active');
        $target.find('video').each(function () {
            this.currentTime = 0;
            this.play();
        });
    });

    // Sync initial video group on page load (silent, no visual flicker)
    var $initialGroup = $('.vr-group-active');
    var videos = $initialGroup.find('video').get();
    
    if (videos.length > 0) {
        // Wait for all videos to have loaded enough data
        var loadedCount = 0;
        var totalVideos = videos.length;
        
        videos.forEach(function(video) {
            var checkLoaded = function() {
                loadedCount++;
                if (loadedCount === totalVideos) {
                    // All videos ready, sync them silently
                    videos.forEach(function(v) {
                        v.pause();
                        v.currentTime = 0;
                    });
                    // Start all videos at the same time
                    videos.forEach(function(v) {
                        v.play();
                    });
                }
            };
            
            if (video.readyState >= 2) {
                // Video already loaded
                checkLoaded();
            } else {
                // Wait for video to load
                video.addEventListener('loadeddata', checkLoaded, { once: true });
            }
        });
    }

})
