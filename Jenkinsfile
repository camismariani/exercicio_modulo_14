pipeline {
    agent any
    

    stages {
        stage('Iniciando o projeto') {
            steps {
                echo 'Hello World'
            }
        }    
        
        stage('Instalar Node') {
            steps {
                nodejs('NodeJS') {
                    sh 'npm install'
                }
            }
        }
        
         stage('Executar Cypress Teste EBAC API') {
            steps {
                nodejs('NodeJS') {
                    sh 'NO_COLOR=1 npx cypress run'
                }
            }
        }

  
    }
}
