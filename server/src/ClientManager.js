import _ from 'lodash';
import path from 'path';
import Client from './Client.js';
import FileManager from './FileManager.js';

class ClientManager {

    constructor(sm){
        this.sm = sm;
        this.client = new Client(this.sm);
        this.fileManager = new FileManager();
    }

    initUserCredentials(options){
        return this.client.setupUserCredentials(options).then(() => { return 'OK'});
    }

    removeUserCredentials(options){
        return this.client.removeUserCredentials().then(() => { return 'OK'});
    }

    getAllProjects(options){
        return this.client.post('/getProjectGalleryList', options);
    }

    loadUserProfile(){
        var userProfile = {
            login: this.sm.getIn('client.user')
        };
        return this.client.post("/secure/getUserProfile", userProfile, true)
            .then( () => {
                return { userName: this.sm.getIn('client.user') };
            });
    }

    createUserProfile(options){
        var userProfile = {
            login: options.user,
            pwd: options.pass,
            email: options.email
        };
        return this.client.post("/addUser", userProfile);
    }

    downloadGalleryFile(options){
        let _options = _.pick(options, ['id', 'packageFileName']);
        return this.client.downloadGet( '/downloadGalleryFile?id=' + _options.id + '&packageFileName=' + _options.packageFileName);
    }

    createProject(options){
        return this.client.post('/secure/createProject', options, true);
    }

    checkCreateProject(options){
        return this.client.post('/secure/checkCreateProject', options, true);
    }

    uploadProjectFiles(options){
        var uploadConfig = {
            url: '/secure/uploadProject/' + options.projectId,
            filePaths: options.filePaths
        };
        return this.client.upload(uploadConfig, true);
    }

}

export default ClientManager;
