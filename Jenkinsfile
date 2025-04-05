pipeline {
    agent any

    environment {
        FIREBASE_TOKEN = credentials('FIREBASE_TOKEN')
        VITE_API_URL = 'https://flow-track-api.duckdns.org'
    }

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'git@github.com:vitaliyoliynykk/react-pomodoro.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'pnpm install'
            }
        }

        stage('Test and build Project') {
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