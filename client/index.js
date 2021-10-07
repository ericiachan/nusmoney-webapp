function checkAuthenticated() {
    console.log('check')
    // Check if user is login
    let userId = sessionStorage.getItem("userid");
    if (userId === null) { 
        // not login
        redirectToLoginPage();
    }

    // Check if element on page to display user information
    let domUserId = document.getElementById('userid');
    if (domUserId)
        domUserId.innerHTML = sessionStorage.getItem("user") + ` (${userId})`;
}

function logout() {
    // Clear all items in sessionStorage
    sessionStorage.clear();
    redirectToLoginPage();
}

function redirectToLoginPage() {
    window.location.href = 'login.html';
}

function setNumberOfCompletedLesson(total) {
    console.log(total);
    sessionStorage.setItem('numberOfCompletedLesson', total);
}

function getNumberOfCompletedLesson() {
    console.log('test')
    console.log(sessionStorage.getItem('numberOfCompletedLesson'))
    return sessionStorage.getItem('numberOfCompletedLesson');
}

async function fetchAllVideo() {
    const response = await fetch("http://localhost:3000/videos");
    const videos = await response.json();
    return videos;
}

async function loadMyLessonProgress() {
    fetchAllVideo().then(data => {
        console.log(data.videos)

        const totalVideos = data.videos.length;
        const completedVideos = getNumberOfCompletedLesson() ? getNumberOfCompletedLesson() : 0;

        const progressLabel = document.getElementById('progressLabel');
        progressLabel.innerHTML = completedVideos + ' / ' + totalVideos;

        const chart = new Chart(document.getElementById('myLessonProgress'), {
            type: 'doughnut',
            data: {
                labels: ['Completed', 'Uncompleted'],
                datasets: [{
                    label: 'My lessons',
                    data: [completedVideos, totalVideos-completedVideos],
                    backgroundColor: [
                    'rgba(54, 162, 235, 0.8)',
                    'rgba(255, 255, 255, 0.2)'
                    ],
                    color: 'rgba(255, 255, 255, 1)',
                    borderWidth: 0
                }]
            },
            options: {
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });
    });
    
}

checkAuthenticated();
