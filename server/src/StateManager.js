import path from 'path';
import { Map, fromJS } from 'immutable';

class StateManager {

    constructor(){
        this.state = fromJS({
            projectState: 'unknown',
            client: {
                serviceURL: 'http://helmetrex.com/rbs',
                user: null,
                pass: null
            },
            storage:{
                server:{
                    config: {
                        fileName: 'redux-builder.json'
                    },
                    templates: {
                        dirName: 'templates'
                    },
                    npmPackage: {
                        fileName: 'package.json'
                    },
                    storage: {
                        dirName: '.data'
                    },
                    siteTemplates: {
                        dirName: 'static-site'
                    },
                    livePreviewTemplates: {
                        dirName: 'live-preview'
                    }
                },
                project:{
                    config: {
                        fileName: 'config.json'
                    },
                    templates: {
                        dirName: 'templates'
                    },
                    builder: {
                        dirName: '.builder'
                    },
                    build: {
                        dirName: 'build'
                    },
                    generators: {
                        dirName: 'generators'
                    },
                    source: {
                        dirName: 'src'
                    },
                    docs: {
                        dirName: 'docs'
                    },
                    docsOverview: {
                        fileName: 'Readme.md'
                    },
                    docsComponents: {
                        dirName: 'components'
                    },
                    index: {
                        fileName: 'index.js'
                    },
                    proxyConfig: {
                        fileName: 'proxy.json'
                    },
                    pageForDesk:{
                        fileName: 'PageForDesk.js'
                    },
                    defaults: {
                        dirName: 'defaults'
                    },
                    nodeModules: {
                        dirName: 'node_modules'
                    },
                    model: {
                        fileName: 'model.json'
                    },
                    siteTemplates: {
                        dirName: 'static-site'
                    },
                    livePreviewTemplates: {
                        dirName: 'live-preview'
                    },
                    scripts: {
                        dirName: 'scripts'
                    },
                    livePreviewBuild: {
                        dirName: 'live-preview'
                    }
                }
            }
        });
    }

    getState(){
        return this.state;
    }

    setIn(path, value){
        const pathArray = path.split('.');
        this.state = this.state.setIn(pathArray, value);
    }

    getIn(path){
        const pathArray = path.split('.');
        return this.state.getIn(pathArray);
    }

    setServerDir(dirPath){
        this.setIn('storage.server.dirPath', dirPath);
        this.setIn('storage.server.config.filePath',
            path.join(dirPath, this.getIn('storage.server.config.fileName')));
        this.setIn('storage.server.templates.dirPath',
            path.join(dirPath, this.getIn('storage.server.templates.dirName')));
        this.setIn('storage.server.npmPackage.filePath',
            path.join(dirPath, this.getIn('storage.server.npmPackage.fileName')));
        this.setIn('storage.server.storage.dirPath',
            path.join(dirPath, this.getIn('storage.server.storage.dirName')));
        this.setIn('storage.server.siteTemplates.dirPath',
            path.join(this.getIn('storage.server.templates.dirPath'), this.getIn('storage.server.siteTemplates.dirName')));
        this.setIn('storage.server.livePreviewTemplates.dirPath',
            path.join(this.getIn('storage.server.templates.dirPath'), this.getIn('storage.server.livePreviewTemplates.dirName')));
    }

    setProjectDir(dirPath){

        const projectDirPath = dirPath;
        const builderDirPath = path.join(projectDirPath, this.getIn('storage.project.builder.dirName'));
        const buildDirPath = path.join(builderDirPath, this.getIn('storage.project.build.dirName'));
        const generatorsDirPath = path.join(builderDirPath, this.getIn('storage.project.generators.dirName'));
        const sourceDirPath = path.join(builderDirPath, this.getIn('storage.project.source.dirName'));
        const indexFilePath = path.join(sourceDirPath, this.getIn('storage.project.index.fileName'));
        const docsDirPath = path.join(builderDirPath, this.getIn('storage.project.docs.dirName'));
        const docsOverviewFilePath = path.join(docsDirPath, this.getIn('storage.project.docsOverview.fileName'));
        const docsComponentsDirPath = path.join(docsDirPath, this.getIn('storage.project.docsComponents.dirName'));
        const defaultsDirPath = path.join(builderDirPath, this.getIn('storage.project.defaults.dirName'));
        const configFilePath = path.join(builderDirPath, this.getIn('storage.project.config.fileName'));
        const proxyConfigFilePath = path.join(builderDirPath, this.getIn('storage.project.proxyConfig.fileName'));
        const pageForDeskFilePath = path.join(sourceDirPath, this.getIn('storage.project.pageForDesk.fileName'));
        const nodeModulesDirPath = path.join(projectDirPath, this.getIn('storage.project.nodeModules.dirName'));
        const modelFilePath = path.join(buildDirPath, this.getIn('storage.project.model.fileName'));
        const templatesDirPath = path.join(builderDirPath, this.getIn('storage.project.templates.dirName'));
        const siteTemplatesDirPath = path.join(templatesDirPath, this.getIn('storage.project.siteTemplates.dirName'));
        const livePreviewTemplatesDirPath = path.join(templatesDirPath, this.getIn('storage.project.livePreviewTemplates.dirName'));
        const livePreviewBuildDirPath = path.join(buildDirPath, this.getIn('storage.project.livePreviewBuild.dirName'));

        this.setIn('storage.project.dirPath', projectDirPath);
        this.setIn('storage.project.builder.dirPath', builderDirPath);
        this.setIn('storage.project.build.dirPath', buildDirPath);
        this.setIn('storage.project.generators.dirPath', generatorsDirPath);
        this.setIn('storage.project.source.dirPath', sourceDirPath);
        this.setIn('storage.project.index.filePath', indexFilePath);
        this.setIn('storage.project.docs.dirPath', docsDirPath);
        this.setIn('storage.project.docsOverview.filePath', docsOverviewFilePath);
        this.setIn('storage.project.docsComponents.dirPath', docsComponentsDirPath);
        this.setIn('storage.project.defaults.dirPath', defaultsDirPath);
        this.setIn('storage.project.config.filePath', configFilePath);
        this.setIn('storage.project.proxyConfig.filePath', proxyConfigFilePath);
        this.setIn('storage.project.pageForDesk.filePath', pageForDeskFilePath);
        this.setIn('storage.project.nodeModules.dirPath', nodeModulesDirPath);
        this.setIn('storage.project.model.filePath', modelFilePath);
        this.setIn('storage.project.templates.dirPath', templatesDirPath);
        this.setIn('storage.project.siteTemplates.dirPath', siteTemplatesDirPath);
        this.setIn('storage.project.livePreviewTemplates.dirPath', livePreviewTemplatesDirPath);
        this.setIn('storage.project.livePreviewBuild.dirPath', livePreviewBuildDirPath);

    }

    getServer(path){
        return this.getIn('storage.server.' + path);
    }

    getProject(path){
        return this.getIn('storage.project.' + path);
    }

}

export default StateManager;