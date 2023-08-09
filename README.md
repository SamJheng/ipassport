# ipassport
### ipassport

1. setup database from docker-compose.yml to your system
    
    ```powershell
    cd docker
    docker-compose up -d
    ```
    
2. install package lib to server
    
    ```powershell
    cd sso-server
    yarn 
    ```
    
3. open sql and create ipassport database
4. setup table scheme to db
    
    ```powershell
    yarn migration:create
    // check your migration dir 
    yarn migration:generate
    // this cmd setup your db
    yarn migration:run
    ```
    
5. seed data to your db
    
    ```powershell
    yarn seed:config
    yarn seed:run
    ```
    
6. start your nest server yarn start
7. start your web clinet
    
    ```powershell
    cd sso-server
    yarn 
    yarn start
    ```