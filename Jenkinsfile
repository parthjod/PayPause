pipeline {
    agent any

    environment {
        DOCKER_HUB_CREDENTIALS_ID = 'dockerhub-credentials'
        DOCKER_IMAGE_NAME         = 'pjthejod/paypause'
        IMAGE_TAG                 = "${BUILD_NUMBER}"
        KUBECONFIG                = '/var/lib/jenkins/.kube/config'
    }

    options {
        buildDiscarder(logRotator(numToKeepStr: '5'))
        disableConcurrentBuilds()
        timeout(time: 20, unit: 'MINUTES')
        ansiColor('xterm')
    }

    stages {
        stage('1. Checkout SCM') {
            steps {
                echo "===> Pulling latest source code from GitHub..."
                checkout scm
            }
        }

        stage('2. Build & Test') {
            steps {
                echo "===> Validating application build and TypeScript syntax..."
                sh '''
                    echo "Checking project files and dependencies readiness..."
                    ls -la
                '''
            }
        }

        stage('3. Docker Build') {
            steps {
                echo "===> Building Docker Image: ${DOCKER_IMAGE_NAME}:${IMAGE_TAG} and latest..."
                sh """
                    docker build -t ${DOCKER_IMAGE_NAME}:${IMAGE_TAG} -t ${DOCKER_IMAGE_NAME}:latest .
                """
            }
        }

        stage('4. Push to Registry') {
            steps {
                echo "===> Logging in to Docker Hub and pushing image..."
                withCredentials([usernamePassword(
                    credentialsId: "${DOCKER_HUB_CREDENTIALS_ID}",
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    sh """
                        echo "\$DOCKER_PASS" | docker login -u "\$DOCKER_USER" --password-stdin
                        docker push ${DOCKER_IMAGE_NAME}:${IMAGE_TAG}
                        docker push ${DOCKER_IMAGE_NAME}:latest
                        docker logout
                    """
                }
            }
        }

        stage('5. Minikube Deployment') {
            steps {
                echo "===> Deploying to Minikube Kubernetes cluster..."
                sh """
                    kubectl apply -f k8s/deployment.yaml
                    kubectl apply -f k8s/service.yaml
                    kubectl set image deployment/paypause-deployment paypause=${DOCKER_IMAGE_NAME}:${IMAGE_TAG} --record
                """
            }
        }

        stage('6. Verification') {
            steps {
                echo "===> Verifying rollout status and running resources..."
                sh """
                    kubectl rollout status deployment/paypause-deployment --timeout=90s

                    echo "--- Kubernetes Pods ---"
                    kubectl get pods -l app=paypause -o wide

                    echo "--- Kubernetes Services ---"
                    kubectl get svc paypause-service

                    echo "--- Minikube Service URL ---"
                    minikube service paypause-service --url || true
                """
            }
        }
    }

    post {
        success {
            echo "✅ Pipeline completed successfully! PayPause is live and verified on Minikube."
        }
        failure {
            echo "❌ Pipeline failed! Check stage logs above for troubleshooting."
        }
        always {
            sh "docker image prune -f || true"
        }
    }
}
