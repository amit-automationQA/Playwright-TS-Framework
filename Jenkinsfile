pipeline {
    agent any

    options {
        timeout(time: 30, unit: 'MINUTES')
        timestamps()
        buildDiscarder(logRotator(numToKeepStr: '10'))
    }

    environment {
        NODE_VERSION = '20'
        CI = 'true'
    }

    stages {
        stage('Checkout') {
            steps {
                script {
                    echo '========== Checking out code =========='
                }
                checkout scm
            }
        }

        stage('Setup Node.js') {
            steps {
                script {
                    echo '========== Setting up Node.js =========='
                }
                tool name: 'NodeJS 20', type: 'jenkins.plugins.nodejs.tools.NodeJSInstallation'
            }
        }

        stage('Install Dependencies') {
            steps {
                script {
                    echo '========== Installing dependencies =========='
                }
                bat 'npm install'
            }
        }

        stage('Install Playwright Browsers') {
            steps {
                script {
                    echo '========== Installing Playwright browsers =========='
                }
                bat 'npx playwright install --with-deps'
            }
        }

        stage('Run Tests') {
            steps {
                script {
                    echo '========== Running Playwright tests =========='
                }
                bat 'npm run test'
            }
        }

        stage('Generate Allure Report') {
            steps {
                script {
                    echo '========== Generating Allure report =========='
                }
                bat 'npm run allure:generate'
            }
        }
    }

    post {
        always {
            script {
                echo '========== Publishing test results =========='
            }

            // Publish Playwright HTML Report
            publishHTML([
                reportDir: 'reports/playwright-inbuilt-report',
                reportFiles: 'index.html',
                reportName: 'Playwright HTML Report',
                keepAll: true,
                alwaysLinkToLastBuild: true
            ])

            // Archive Allure results
            archiveArtifacts artifacts: 'allure-results/**', 
                            allowEmptyArchive: true

            // Archive test results
            archiveArtifacts artifacts: 'reports/**', 
                            allowEmptyArchive: true

            // Publish JUnit results
            junit testResults: 'reports/playwright-inbuilt-report/junit.xml',
                  allowEmptyResults: true

            // Publish Allure Report if available
            script {
                if (fileExists('allure-report/index.html')) {
                    publishHTML([
                        reportDir: 'allure-report',
                        reportFiles: 'index.html',
                        reportName: 'Allure Report',
                        keepAll: true,
                        alwaysLinkToLastBuild: true
                    ])
                }
            }

            // Clean workspace
            deleteDir()
        }

        success {
            script {
                echo '========== Tests passed successfully =========='
            }
        }

        failure {
            script {
                echo '========== Tests failed =========='
            }
        }

        unstable {
            script {
                echo '========== Build is unstable =========='
            }
        }
    }
}
