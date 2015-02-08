<?php

class CustomerContact extends \Eloquent {
    protected $table = "customer_contact";
    protected $primaryKey = 'customer_contact_id';
    protected $fillable = ['customer_id', 'first_name', 'last_name', 'title', 'phone', 'fax', 'email', 'notes'];
}