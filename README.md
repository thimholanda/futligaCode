# futligaCode

# IOS (MacOs)

- ### Antes de Instalar

    1. Remover a pasta Posts
    2. Remover o arquivo Podfile.lock
    
- ### Instalar dependencias

    1. Executar comando
    
        ```npx install-peerdeps --dev eslint-config-airbnb```
        
        ````yarn install````
    
    2. Entrar na pasta ios e executar o comando
    
        ```pod install```
    
**
Obs.: Se Xcode é menor de 12.4, então, descomentar linha 26 no arquivo ios/Podfile
**

- ###  Compilar

    1. Executar Build pelo Xcode

- ### Executar

    1. ````npm run-script ios```` 

