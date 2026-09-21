pipeline {
  agent {
    kubernetes {
      yaml '''
        apiVersion: v1
        kind: Pod
        spec:
          containers:
          - name: kaniko
            image: gcr.io/kaniko-project/executor:debug
            command:
            - sleep
            args:
            - 9999999
            volumeMounts:
            - name: docker-config
              mountPath: /kaniko/.docker
          volumes:
          - name: docker-config
            secret:
              secretName: harbor-creds-dockerconfig
      '''
    }
  }
  stages {
    stage('Build and Push') {
      steps {
        container('kaniko') {
          sh '''
            /kaniko/executor \
              --dockerfile=Dockerfile \
              --context=$(pwd) \
              --destination=harbor-core.harbor.svc.cluster.local/library/sample-backend:${BUILD_NUMBER} \
              --insecure \
              --insecure-pull \
              --skip-tls-verify
          '''
        }
      }
    }
  }
}