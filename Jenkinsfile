pipeline {
    agent any
    stages {
        stage('Stop Existing App') {
            steps {
                script {
                    // Check if the application is running on the specified port
                    def port = 9000
                    def isRunning = sh(script: "netstat -aon | findstr :${port}", returnStatus: true) == 0
                    if (isRunning) {
                        // Command to stop the running app, e.g., using Docker
                        sh 'docker stop wild-oasis-cont' // Replace <container_id> with your actual container ID
                        sh 'docker rm wild-oasis-cont'
                        sh 'docker rmi wild-oasis'
                    } else {
                        echo "No application is running on port ${port}."
                    }
                }
            }
        }
        stage('Build') {
            steps {
                // Pull latest code and build the application
                sh 'git pull origin master' // Adjust if needed
                // sh 'npm install' // Install dependencies
                // sh 'npm run build' // Build the application
                sh 'docker build -t wild-oasis'
            }
        }
        stage('Run App') {
            steps {
                // Start the application again
                sh 'docker run --name wild-oasis-cont -d -p 9000:8080 wild-oasis' // Or your specific start command
            }
        }
    }
}
