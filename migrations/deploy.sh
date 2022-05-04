export PGUSER=circles
export PGPASSWORD=circles
export PGDATABASE=circles


sqitch deploy --verify db:pg:circles
