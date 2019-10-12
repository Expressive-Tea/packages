export interface ExpressiveTeaServerProps {
    port?: number;
    [key: string]: any;
}

export interface ExpressiveTeaPluginProps {
    name: string;
    priority: number;
}

export interface ExpressiveTeaPluginSettings {
    priority?: number;
    name?: string;
    dependencies?: string[];
    [key: string]: any;
}
