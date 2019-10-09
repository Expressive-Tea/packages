import {Express} from "express";

export type StageMethod =  (server: Express) => void;
