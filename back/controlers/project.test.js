const {newProject }= require('./project'); 

describe("Test project", () => {
    test("test newProject", async () =>{
        // arrange : l'ensemble des paramètres nécéssaires
        var req = {
            headers:{
                authorization: "Baerer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlOGUwNmIyYjEwZDFmMDA2ZWFkYTM3NyIsInJvbGUiOiJBcnRpc3RlIiwiaWF0IjoxNTg3MTE1MjM0fQ.IwIR4Fvn9w4hYvkkJbw_AqBXzwDw8fk9abcsu2F3sCA"
            },

            body:{
                titleProject: "testTitle",
                description: "descriptionTitle",
                content: "contentProject",
                userId:"5e8e06b2b10d1f006eada377"
            }
        }

        const res = {};
        res.status = 200;
    
        // Act: La fonction ou l'élément à tester
        let resProject = await newProject(req, res)
        console.log(resProject)
        // Assert: Le résultat attendu
        expect(resProject).toBeTruthy();
    });
});