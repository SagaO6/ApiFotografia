select u.idUsuario, u.nomeUsuario, -- seguidores.idSeguidor as seguindo, seguidores.idSeguido as seguidoPor,
sum(case when seguidores.idSeguido is null then 0 
else 1
end) as Seguidores
from seguidores 
left join profissionais 
on profissionais.idProfissional = seguidores.idSeguido
right join usuarios u 
on profissionais.idUsuario = u.idUsuario
group by u.idUsuario, u.nomeUsuario;



select u1.nomeUsuario as seguidor, 
u1.idUsuario as idSeguidor, 
sum( case when u.idUsuario is not null then 1
else 0 
end ) as seguindo
from seguidores 
right join usuarios u1
on u1.idUsuario = seguidores.idSeguidor 
left join profissionais 
on profissionais.idProfissional = seguidores.idSeguido
left join usuarios u 
on profissionais.idUsuario = u.idUsuario
group by u1.idUsuario, u1.nomeUsuario;


with seguindo as (
select u1.nomeUsuario as seguidor, 
u1.idUsuario as idSeguidor, 
sum( case when u.idUsuario is not null then 1
else 0 
end ) as seguindo
from seguidores 
right join usuarios u1
on u1.idUsuario = seguidores.idSeguidor 
left join profissionais 
on profissionais.idProfissional = seguidores.idSeguido
left join usuarios u 
on profissionais.idUsuario = u.idUsuario
group by u1.idUsuario, u1.nomeUsuario
), 
seguidores as (
select u.idUsuario, u.nomeUsuario, -- seguidores.idSeguidor as seguindo, seguidores.idSeguido as seguidoPor,
sum(case when seguidores.idSeguido is null then 0 
else 1
end) as Seguidores
from seguidores 
left join profissionais 
on profissionais.idProfissional = seguidores.idSeguido
right join usuarios u 
on profissionais.idUsuario = u.idUsuario
group by u.idUsuario, u.nomeUsuario
)
select seguidores.idUsuario, nomeUsuario, seguindo, seguidores from seguindo
inner join seguidores
on seguidores.idUsuario = seguindo.idSeguidor;


