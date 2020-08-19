// This is used to ensure that everything in the core should be loaded at the AppModule once and only AppModule. If not, should put in Shared Folder or related feature's folder
export class EnsureModuleLoadedOnceGuard {

  constructor(targetModule: any) {
    if (targetModule) {
      throw new Error(`${targetModule.constructor.name} has already been loaded. Import this module in the AppModule only.`);
    }
  }

}
