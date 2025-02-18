pipeline {
    agent any

    stages {
        stage('Checkout Code') {
            steps {
                git 'https://github.com/pyohner/getting-started-app.git'  // Replace with your actual repo
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'yarn install'  // Install dependencies (including devDependencies)
            }
        }

        stage('Run Tests') {
            steps {
                sh 'yarn test'  // Runs tests
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t my-todo-app .'  // Build Docker image
            }
        }

        stage('Run App in Docker') {
            steps {
                sh 'docker run -d -p 3000:3000 --name todo-app my-todo-app'
            }
        }
    }
}
