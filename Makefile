all:
    @echo "Doing all"

deploy:
    @echo "Pushing to production"
    @git push git@example.com:~/testapp master

update:
    @echo "Makefile: Doing UPDATE stuff like grunt, gulp, rake,..."
    @whoami
    @pwd
