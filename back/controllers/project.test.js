const {newProject }= require('./project'); 
const fetch = require('node-fetch');

describe("Test project", () => {
    test.skip("test newProject", async () =>{
        // arrange : l'ensemble des paramètres nécéssaires
      

        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlYTQzOTk4NzA2YWJlMDA1YTZlYzNjZCIsInJvbGUiOiJBcnRpc3RlIiwiaWF0IjoxNTg4MjYzMTM1LCJleHAiOjE1ODgzNDk1MzV9.L21M6ypFi6Xx7TZ3FZIYjZ8i_dII-dSp2XP0kvJjR_A"
        
        const data = {
            titleProject: "testTitle",
            description: "descriptionTitle",
            content: "contentProject",
            cover: "popo.jpg",
            userId:"5ea43998706abe005a6ec3cd"
        };

    
        // Act: La fonction ou l'élément à tester
       const resProject = await fetch(`http://localhost:5000/user/addProject`, {
                headers:{
                    "Authorization": "Bearer " + token,
                },
                method: 'POST',
                body: data,
                file:{filename: "popo.jpg"}
            })
        
        console.log(resProject.status)
            
        // Assert: Le résultat attendu
        expect(resProject.status).toBeTruthy();
        expect(resProject.status).toBe(200)
    });

    test.only("test newProject", async () =>{
        // arrange : l'ensemble des paramètres nécéssaires
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlYTQzOTk4NzA2YWJlMDA1YTZlYzNjZCIsInJvbGUiOiJBcnRpc3RlIiwiaWF0IjoxNTg4MjY2MjU1LCJleHAiOjE1ODgzNTI2NTV9.CjAgv5YEBmbGsEoFh9B8vg8trJqxPNkih5RvvKHg4oc"

    
        // Act: La fonction ou l'élément à tester
       const resProject = await Promise.resolve( fetch('http://localhost:5000/user/getById',{
            headers:{
                "Authorization": "Bearer " + token
            },
            method: 'GET'
        }))
       
        console.log(resProject.json())
        // Assert: Le résultat attendu
        expect(resProject).toBeTruthy(); //Cela existe bien 
        expect(resProject.status).toBe(200) //Permet de voir quelle data est pertinente à tester 
    });
});