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
