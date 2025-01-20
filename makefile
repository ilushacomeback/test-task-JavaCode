install-backend:
	cd backend && make install
install-frontend:
	cd frontend && make install
start-frontend:
	cd frontend && make dev
start-backend:
	cd backend && make dev
build-frontend:
	cd frontend && make build
build-backend:
	cd backend && make build
dev:
	make start-backend & make start-frontend
build:
	make build-backend & make build-frontend
install:
	make install-backend & make install-frontend
