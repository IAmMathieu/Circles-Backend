-- Deploy circles:surname_trigfunc to pg

BEGIN;

create or replace function firstname_to_surname() returns trigger as $$
begin
	if NEW.surname is null then
		NEW.surname := NEW.firstname || LEFT(NEW.lastname, 1);
	end if;
	return new;
end;
$$ language plpgsql;

create trigger trig_firstname_to_surname
before insert
on "user"
for each row
execute procedure firstname_to_surname();

COMMIT;
