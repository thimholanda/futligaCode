# futligaCode

## Instalar e Rodar APP = IOS

1. Entrar dentro da pasta ios e remover a pasta Posts e o Podfile.lock

    
1 - Instalar dependencias
    
```npx install-peerdeps --dev eslint-config-airbnb```
        
````yarn install````

```cd ios && pod install```
    
**Obs.: Se Xcode é menor de 12.4, então, descomentar linha 26 no arquivo ios/Podfile

### 2 - Rodar aplicação

```npm run-script ios```

** Obs.: Caso ocorrer erro de não encontrar as fontes, basta executar >

```react-native link```