import { Role } from "@prisma/client";

interface AccessRule {
  roles: Role[];
  methods: string[];
}

const accessRules: Record<string, AccessRule> = {
  "/staff/[...path]": {
    roles: [Role.STAFF, Role.ADMIN],
    methods: ["GET"],
  },
  "/admin/[...path]": {
    roles: [Role.ADMIN],
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
};

export default accessRules;
