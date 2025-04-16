pipeline {
    agent any

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/pyohner/getting-started-app.git'  // Replace with your actual repo
            }
        }

        stage('Install Dependencies') {
            steps {
                   bat 'yarn install'  // Install dependencies (including devDependencies)
//                 bat 'C:/Users/yohnep25/AppData/Roaming/npm/yarn install'  // Install dependencies (including devDependencies)
            }
        }

        stage('Run Tests') {
            steps {
                bat 'yarn test'  // Runs tests
//                 bat 'C:/Users/yohnep25/AppData/Roaming/npm/yarn test'  // Runs tests
            }
        }

        stage('Build Docker Image') {
            steps {
                bat 'docker build -t getting-started-app .'  // Build Docker image
            }
        }

        stage('Run App in Docker') {
            steps {
                bat 'docker run -d -p 3000:3000 --name getting-started-app getting-started-app'
            }
        }
    }
}
