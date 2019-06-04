#include <stdio.h>
#include <stdlib.h>

int main(int argc, char *argv[]) {	
	//system("nodemon C:/Users/Bruno64/Documents/Games/ProjectAlfa/app.js"); 	
	
	char cwd[PATH_MAX];
	if (getcwd(cwd, sizeof(cwd)) != NULL) {           //Guarda la ruta del ejecutable en: cwd
	   //printf("Current working dir: %s\n", cwd);
	} else {
	   perror("getcwd() error");
	   return 1;
	}
		
	char Command[PATH_MAX] = "";
	strcat(Command, "node ");  //node o nodemon
	strcat(Command, cwd);
	strcat(Command, "\\app.js");	
	printf("%s", Command);	
	
	system(Command);
	system("pause");	
}
