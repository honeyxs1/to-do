import {format} from 'date-fns';


class Project{
    constructor(name){
        this.id =format(new Date(),'yyyyMMddHHmmssSSS');
        this.name=name;
        this.todos=[];
    }
}

export default Project;