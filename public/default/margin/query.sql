-- parameters setup here
SET @limit = 5;

-- query here
SELECT 
    * 
FROM 
    revenue 
ORDER BY 
    revenue DESC 
LIMIT @limit;