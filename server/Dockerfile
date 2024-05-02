From golang:1.22

WORKDIR /go/src/app

COPY . .

RUN go build -o main cmd/cashsync/main.go

CMD ["./main"]