.PHONY: start

start:
	@echo Start DangeJS Webhook Reciever
	@docker-compose up --build prbot
