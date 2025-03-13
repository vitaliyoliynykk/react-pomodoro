pipeline {
    agent any

    environment {
        FIREBASE_TOKEN = credentials('FIREBASE_TOKEN')
    }

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'git@github.com:vitaliyoliynykk/react-pomodoro.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'nvm use'
                sh 'pnpm install'
            }
        }

        stage('Build Project') {
            steps {
                sh 'pnpm run build'
            }
        }

        stage('Deploy to Firebase') {
            steps {
                sh 'firebase deploy --token=$FIREBASE_TOKEN'
            }
        }
    }
}