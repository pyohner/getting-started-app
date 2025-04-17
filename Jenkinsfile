pipeline {
    agent any

    environment {
            // names for your image & container
            IMAGE_NAME      = 'getting-started-app'
            CONTAINER_NAME  = 'getting-started-app'
        }

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/pyohner/getting-started-app.git'  // Replace with your actual repo
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

//         steps {
//         set BUILD_NUMBER=%BUILD_NUMBER%
//             // tear down old stack
//             bat 'docker-compose down'
//             // build & bring up 3 copies + NGINX LB
//             bat 'docker-compose up -d --build --scale app=3'
//           }

//             steps {
//                 // stop & remove any existing container (ignore errors if it doesn't exist)
//                 bat '''
//                     docker stop %CONTAINER_NAME% || echo "container not running"
//                     docker rm   %CONTAINER_NAME% || echo "container not found"
//                 '''
//                 // run the newly built image
//                 bat "docker run -d -p 3000:3000 --name %CONTAINER_NAME% %IMAGE_NAME%:%BUILD_NUMBER%"
//             }


//             steps {
//                 bat 'docker run -d -p 3000:3000 --name getting-started-app getting-started-app'
//             }
        }
    }
}
