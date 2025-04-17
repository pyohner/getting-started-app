pipeline {
    agent any

    environment {
            // names for image & container
            IMAGE_NAME      = 'getting-started-app'
            CONTAINER_NAME  = 'getting-started-app'
        }

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/pyohner/getting-started-app.git'  // Repo
            }
        }

        stage('Install Dependencies') {
            steps {
                   bat 'npm ci'  // Install dependencies (including devDependencies)
            }
        }

        stage('Run Tests') {
            steps {
                bat 'npm test'  // Runs tests
            }
        }

        stage('Build Docker Image') {
            steps {
                bat 'docker build -t %IMAGE_NAME%:%BUILD_NUMBER% .'  // Build Docker image
            }
        }

        stage('Deploy') {

        steps {
            bat '''
              REM — export the Jenkins BUILD_NUMBER into this shell
              set BUILD_NUMBER=%BUILD_NUMBER%

              REM — tear down any existing app+nginx stack
              docker-compose down

              REM — rebuild image, spin up 3 replicas + nginx LB
              docker-compose up -d --build --scale app=3
            '''
          }
        }
    }
}
