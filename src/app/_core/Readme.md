# CaresPWA Project Core Folder

The purpose of this folder is intend to hold **singleton services shared through out the application**. For example, AuthService, ErrorService, UserServcie and so on. If the service is specific to a feature, please put it in the feature's folder. **All the modules or services under this fold should only be loaded once at the AppModule.**

> Note: the `ensure-module-loaded-once.guard.ts` file is used to guard the modules under the `core` folder should only be referenced once in the `Appmodule`, please reference the usage to any of the existing `*.module.ts` file to see how to use it.

Here are the folders that under the core folder along with a brief explaination about the main purpose of the folder, please keep this updated whenever new subfolders under the core is updated:

* **interceptor**: this folder is used to hold all the http request interceptors
* **modal**: this folder is used to provider a modal control through out the application as a singleton UI module
* **overlay**: this folder is used to provider a overlay for general request delay(typically http request)through out the application as a singleton module
* **services**: this folder is used to hold all the general services. They should be reused through out the application. If the service is specific to a feature, it should be under the folder of the feature
* **sysmessage**: this folder is used to provider a system message control through out the application as a singleton UI module
