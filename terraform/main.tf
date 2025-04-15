provider "azurerm" {
  features {}
}

terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 4.2.0"
    }
  }

  backend "azurerm" {
    resource_group_name  = "crmbly-tfstate"
    storage_account_name = "crmblytfstate"
    container_name       = "prod-tfstate"
    use_azuread_auth     = true
  }
}

locals {
  resource_prefix = "crmbly"
  common_tags = {
    Environment = var.environment
    Project     = "Crmbly"
    ManagedBy   = "Terraform"
  }
}

resource "azurerm_resource_group" "main" {
  name     = "rg-${local.resource_prefix}-${var.environment}"
  location = "eastus"
  tags     = local.common_tags
}
