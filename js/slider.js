function frameSlideIn(id) {
    document.getElementById(id).classList.remove('slide-out');
    document.getElementById(id).classList.add('slide-in');
}

function frameSlideOut(id) {
    document.getElementById(id).classList.remove('slide-in');
    document.getElementById(id).classList.add('slide-out');
    setTimeout(function(){closeFrame('task_overlay_bg');}, 150);
    }