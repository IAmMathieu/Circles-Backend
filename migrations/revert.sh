export PGUSER=circles
export PGPASSWORD=circles
export PGDATABASE=circles


sqitch revert db:pg://circles:circles@0.0.0.0/circles

# Attention la ligne si dessus permet de se connecter a une bdd postgres dans un container docker
# Pour se connecter à une bdd postgres classique utilisez la ligne commentée si dessous et commentez l'autre

#sqitch revert db:pg:circles